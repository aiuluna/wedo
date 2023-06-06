"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBuilder = void 0;
const code_1 = require("@wedo/code");
const CodeProjectFS_1 = require("./CodeProjectFS");
const Rollup_1 = require("./Rollup");
const request_1 = require("@wedo/request");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const FCBuilder_1 = __importDefault(require("./FCBuilder"));
class ProjectBuilder {
    build(user, name, cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectFS = new CodeProjectFS_1.CodeProjectFS(cwd);
            const project = yield projectFS.download(user, name);
            console.log("project downloaded...", cwd);
            switch (project.getType()) {
                case "codeless":
                    console.log("project rollup build start...");
                    const rollup = new Rollup_1.Rollup(cwd);
                    yield rollup.build();
                    const uploadResult = yield request_1.fileRemote.post1("codeless", "js", yield (0, promises_1.readFile)(path_1.default.resolve(cwd, 'build/index.js'), {
                        encoding: 'utf-8'
                    }));
                    project.setScriptURL(uploadResult.data);
                    console.log('project rollup build done..., scriptUrl =>', uploadResult.data);
                    const repoCodeLess = new code_1.CodeProjectRepo(project);
                    yield repoCodeLess.save(user);
                    break;
                case "faas":
                    console.log('compiler faas project...');
                    const fcBuilder = new FCBuilder_1.default(cwd);
                    yield fcBuilder.build();
                    projectFS.removeDirectory(project, path_1.default.resolve(cwd, 'build'), 'build');
                    projectFS.addDirectory(project, path_1.default.resolve(cwd, 'build'), 'build');
                    const repoFaas = new code_1.CodeProjectRepo(project);
                    yield repoFaas.save(user);
                    break;
                default:
                    throw new Error(`type ${project.getType()} not supported.`);
                    break;
            }
        });
    }
}
exports.ProjectBuilder = ProjectBuilder;
