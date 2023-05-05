import { CodeProject, FileTreeNode } from '@wedo/code'
import { codeProjectRemote } from '@wedo/request'
import fs from 'fs';
import path from 'path';

// 处理文件上传等上下文类
export class CodeProjectFS {
  private cwd: string;
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

  public async upload(project: CodeProject) {
    const fileNode = this.createFileNode(this.cwd, '');
    project.setRootNode(fileNode);

    const shouldUpdates = [...fileNode.find(x => x.isDirty())]

    for (let file of shouldUpdates) {
      // const result = 
    }
    await codeProjectRemote.put('default', project.getName(), project.getJSON())


  }

}