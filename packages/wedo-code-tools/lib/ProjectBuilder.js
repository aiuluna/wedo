"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBuilder = void 0;
const CodeProjectFS_1 = require("./CodeProjectFS");
class ProjectBuilder {
    async build(user, name, cwd) {
        const projectFS = new CodeProjectFS_1.CodeProjectFS(cwd);
        const project = await projectFS.download(user, name);
        console.log("project downloaded...", cwd);
    }
}
exports.ProjectBuilder = ProjectBuilder;
