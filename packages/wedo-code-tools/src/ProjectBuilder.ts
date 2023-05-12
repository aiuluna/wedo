import { CodeProjectRepo, CodeProjectType } from "@wedo/code";
import { CodeProjectFS } from "./CodeProjectFS";
import { Rollup } from "./Rollup";
import { fileRemote } from "@wedo/request";
import { readFile } from "fs/promises";
import path from "path";
export class ProjectBuilder {
  async build(user: string, name: string, cwd: string) {
    const projectFS = new CodeProjectFS(cwd)
    const project = await projectFS.download(user, name)

    console.log("project downloaded...", cwd)

    switch (project.getType() as CodeProjectType) {
      case "codeless":
        console.log("project rollup build start...")
        const rollup = new Rollup(cwd)
        await rollup.build()
        const uploadResult = await fileRemote.post1("codeless", "js", await readFile(path.resolve(cwd, 'build/index.js'), {
          encoding: 'utf-8'
        }))
        project.setScriptURL(uploadResult.data)
        const repo = new CodeProjectRepo(project)
        await repo.save(user)
        break;

      default:
        break;
    }

  }
}