import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType } from "./types";

export class CodeProject {
  private version: number;
  private root: FileTreeNode;

  constructor(private name: string, private type: CodeProjectType) {
    this.version = 0;
    this.root = new FileTreeNode('root', 'dir')
  }
}