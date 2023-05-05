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

  public setRootNode(node: FileTreeNode) {
    this.root = node;
  }

  public getRoot() {
    return this.root
  }

  public getName() {
    return this.name;
  }

  public getJSON() {
    return {
      name: this.name,
      type: this.type,
      version: this.version,
      scriptUrl: '',
      fileTreeNode: this.root.toJSON()
    }
  }
}