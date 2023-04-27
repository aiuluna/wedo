import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileTreeNodeConfig } from "./types";

export class CodeProject {
  private version: number;
  private root: FileTreeNode;

  constructor(private name: string, private type: CodeProjectType) {
    this.version = 0;
    this.root = new FileTreeNode('root', 'dir')
  }

  public setRoot(root: FileTreeNodeConfig) {
    this.root = FileTreeNode.fromJSON(root)
  }

  public getRoot() {
    return this.root
  }
}