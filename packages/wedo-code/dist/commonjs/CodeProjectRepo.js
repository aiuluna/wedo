"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProjectRepo = void 0;
const CodeProject_1 = require("./CodeProject");
const request_1 = require("@wedo/request");
class CodeProjectRepo {
    project;
    constructor(project) {
        this.project = project;
    }
    async save(user) {
        let updated = false;
        for (const update of [...this.project.getRoot().find(file => file.isDirty())]) {
            const result = await request_1.fileRemote.post1('codeless', update.getExt() || "", update.getContent() || "");
            update.setUrl(result.data);
            update.saved();
            updated = true;
        }
        if (updated) {
            this.project.incrVer();
        }
        await request_1.codeProjectRemote.put(user, this.project.getName(), this.project.toJSON());
        console.log('project saved.', this.project.toJSON());
    }
    static async load(user, name) {
        const result = await request_1.codeProjectRemote.get(user, name);
        console.log("🚀 ~ file: CodeProjectRepo.ts:27 ~ CodeProjectRepo ~ load ~ result:", result);
        const project = CodeProject_1.CodeProject.formJSON(result.data);
        return project;
    }
}
exports.CodeProjectRepo = CodeProjectRepo;
