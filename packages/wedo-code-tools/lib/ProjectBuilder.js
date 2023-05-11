"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBuilder = void 0;
const CodeProjectFS_1 = require("./CodeProjectFS");
const Rollup_1 = require("./Rollup");
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
                // const repo = new CodeProjectRepo()
                break;
            default:
                break;
        }
    }
}
exports.ProjectBuilder = ProjectBuilder;
