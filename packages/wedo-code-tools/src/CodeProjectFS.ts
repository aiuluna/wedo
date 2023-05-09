import { CodeProject, CodeProjectType, FileTreeNode, ProjectJSON } from '@wedo/code'
import { codeProjectRemote, fileRemote } from '@wedo/request'
import fs from 'fs';
import path from 'path';

// 处理文件上传等上下文类
export class CodeProjectFS {
  constructor(private cwd: string) {
  }

  // 根据dir在内存中生成FileTreeNode
  private createFileNode(dir: string, name: string): FileTreeNode {
    const files = fs.readdirSync(dir);
    const fNode = new FileTreeNode(name, 'dir');
    for (let file of files) {
      const fullName = path.resolve(dir, file);
      if (fs.statSync(fullName).isDirectory()) {
        fNode.add(this.createFileNode(fullName, file))
      } else {
        const fileNode = new FileTreeNode(file, 'file')
        fileNode.setContent(fs.readFileSync(fullName, 'utf-8'))
        fNode.add(fileNode)
      }
    }
    return fNode;
  }

  public async upload(user: string, project: CodeProject) {
    const fileNode = this.createFileNode(this.cwd, '');
    project.setRootNode(fileNode);

    const shouldUpdates = [...fileNode.find(x => x.isDirty())]

    for (let file of shouldUpdates) {
      const result = await fileRemote.post1('/code', file.getExt(), file.getContent())
      file.setUrl(result.data)
      file.saved()
    }
    const result = await codeProjectRemote.put(user, project.getName(), project.toJSON())
    if (!result.success) {
      throw new Error('upload failed:' + result.data)
    }
  }


  private async downloadFile(base: string, node: FileTreeNode) {
    const targetPath = path.resolve(base, node.getFileName())
    if (node.getFileType() === 'dir') {
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      fs.mkdirSync(targetPath)

      for (let child of node.getChildren()){
        await this.downloadFile(targetPath, child)
      }
      return
    }

    const result = await fileRemote.get(node.getUrl())
    const content = result.data;
    node.setContent(content)
    node.saved()

    fs.writeFileSync(targetPath, node.getContent(), "utf-8")
  }


  public async download(user: string, name: string) {
    console.log("fs---download", name)
    const result = await codeProjectRemote.get(user, name);
    const json: ProjectJSON = result.data;
    const project: CodeProject = CodeProject.formJSON(json);
    await this.downloadFile(this.cwd, project.getRoot());
    return project;
  }

  public static async createTemplates() {

    for (let key in CodeProject.TemplateNames) {
      const template = CodeProject.TemplateNames[key];
      const project = new CodeProject(template, key as CodeProjectType)
      const fs = new CodeProjectFS(path.resolve(__dirname, '../template', key as CodeProjectType))
      await fs.upload("template", project)
    }
  }

}