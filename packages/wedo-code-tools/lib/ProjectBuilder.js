"use strict";
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
class ProjectBuilder {
    async build(user, name, cwd) {
        const projectFS = new CodeProjectFS_1.CodeProjectFS(cwd);
        const project = await projectFS.download(user, name);
        console.log("project downloaded...", cwd);
        switch (project.getType()) {
            case "codeless":
                console.log("project rollup build start...");
                const rollup = new Rollup_1.Rollup(cwd);
                await rollup.build();
                const uploadResult = await request_1.fileRemote.post1("codeless", "js", await (0, promises_1.readFile)(path_1.default.resolve(cwd, 'build/index.js'), {
                    encoding: 'utf-8'
                }));
                project.setScriptURL(uploadResult.data);
                const repo = new code_1.CodeProjectRepo(project);
                await repo.save(user);
                break;
            default:
                break;
        }
    }
}
exports.ProjectBuilder = ProjectBuilder;
