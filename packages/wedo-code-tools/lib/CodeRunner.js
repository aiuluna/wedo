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
exports.CodeRunner = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CodeProjectFS_1 = require("./CodeProjectFS");
const request_1 = require("@wedo/request");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
class CodeRunner {
    constructor(cwd, user, project) {
        this.cwd = cwd;
        this.user = user;
        this.project = project;
    }
    loadProjectStatus() {
        try {
            return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(this.cwd, '.project'), 'utf-8'));
        }
        catch (error) {
            return { lastBuild: 0 };
        }
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastBuild } = this.loadProjectStatus();
            const result = yield request_1.codeProjectRemote.get(this.user, this.project);
            if (!result.success) {
                throw new Error(result.message);
            }
            // 线上版本小于本地之前build的版本，不需要更新
            console.log('result.data', result.data);
            const version = result.data.version;
            console.log('version', version, lastBuild, version <= lastBuild);
            if (version <= lastBuild)
                return 'skip';
            if (fs_1.default.existsSync(this.cwd)) {
                fs_1.default.rmSync(this.cwd, {
                    recursive: true,
                    force: true
                });
            }
            fs_1.default.mkdirSync(this.cwd);
            return 'reload';
        });
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectFS = new CodeProjectFS_1.CodeProjectFS(this.cwd);
            const project = yield projectFS.download(this.user, this.project);
            execPromise('yarn', {
                cwd: this.cwd
            });
            const lastSuccessBuild = project.getVersion();
            fs_1.default.writeFileSync(path_1.default.resolve(this.cwd, '.project'), JSON.stringify({ lastBuild: lastSuccessBuild }), 'utf-8');
        });
    }
    run(fnName, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const indexModulePath = path_1.default.resolve(this.cwd, './build/index.js');
            const prepareResult = yield this.prepare();
            switch (prepareResult) {
                case 'skip':
                    console.log('skip');
                    break;
                case 'reload':
                    console.log('reload');
                    delete require.cache[indexModulePath];
                    yield this.build();
                    break;
            }
            const module = require(indexModulePath);
            const fn = module[fnName];
            if (!fn) {
                throw new Error(`fn ${fnName} is not a function`);
            }
            return yield fn(...args);
        });
    }
}
exports.CodeRunner = CodeRunner;
