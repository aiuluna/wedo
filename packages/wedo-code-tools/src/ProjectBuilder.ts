import { CodeProjectType } from "@wedo/code";
import { CodeProjectFS } from "./CodeProjectFS";
import { Rollup } from "./Rollup";

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

        // const repo = new CodeProjectRepo()
        break;

      default:
        break;
    }

  }
}