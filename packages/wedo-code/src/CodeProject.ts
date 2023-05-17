import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileNodeJSON, ProjectJSON } from "./types";

export class CodeProject {
  private version: number;
  private root: FileTreeNode;
  private scriptUrl?: string;

  static TemplateNames = {
    codeless: 'codeless-template'
  }

  constructor(private name: string, private type: CodeProjectType) {
    this.version = 0;
    this.root = new FileTreeNode('root', 'dir')
  }

  public setRootByJSON(root: FileNodeJSON) {
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

  public getType() {
    return this.type
  }

  public setScriptURL(url: string) {
    this.scriptUrl = url;
  }

  public getScriptURL() {
    return this.scriptUrl
  }

  public toJSON(): ProjectJSON {
    return {
      name: this.name,
      type: this.type,
      version: this.version,
      scriptUrl: this.scriptUrl || "",
      fileTreeNode: this.root.toJSON()
    }
  }

  public incrVer() {
    this.version = this.version++
  }

  static formJSON(json: ProjectJSON): CodeProject {
    const project = new CodeProject(json.name, json.type as CodeProjectType);
    project.setRootByJSON(json.fileTreeNode)
    project.scriptUrl = json.scriptUrl
    project.version = json.version
    return project;
  }
}