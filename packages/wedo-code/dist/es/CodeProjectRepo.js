import { codeProjectRemote, fileRemote } from "@wedo/request";
export class CodeProjectRepo {
    project;
    constructor(project) {
        this.project = project;
    }
    async save(user) {
        let updated = false;
        for (const update of [...this.project.getRoot().find(file => file.isDirty())]) {
            const result = await fileRemote.post1('codeless', update.getExt() || "", update.getContent() || "");
            update.setUrl(result.data);
            update.saved();
            updated = true;
        }
        if (updated) {
            this.project.incrVer();
        }
        await codeProjectRemote.put(user, this.project.getName(), this.project.toJSON());
        console.log('project saved.', this.project.toJSON());
    }
}
