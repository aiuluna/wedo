import { CodeProject } from "./CodeProject";
import { codeProjectRemote, fileRemote } from "@wedo/request";

export class CodeProjectRepo {
  constructor(private project: CodeProject) { }

  public async save(user: string) {
    let updated = false;
    for (const update of [...this.project.getRoot().find(file => file.isDirty())]) {
      const result = await fileRemote.post1('codeless', update.getExt() || "", update.getContent() || "")
      update.setUrl(result.data)
      update.saved()
      updated = true
    }
    if (updated) {
      this.project.incrVer()
    }
    await codeProjectRemote.put(user, this.project.getName(), this.project.toJSON())

    console.log('project saved.', this.project.toJSON())
  }

  public static async load(user: string, name: string) {
    const result = await codeProjectRemote.get(user, name);
    console.log("🚀 ~ file: CodeProjectRepo.ts:27 ~ CodeProjectRepo ~ load ~ result:", result)

    const project = CodeProject.formJSON(result.data);
    return project
  }

}