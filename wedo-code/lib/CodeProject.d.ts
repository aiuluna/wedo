import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileTreeNodeConfig } from "./types";
export declare class CodeProject {
    private name;
    private type;
    private version;
    private root;
    constructor(name: string, type: CodeProjectType);
    setRoot(root: FileTreeNodeConfig): void;
    getRoot(): FileTreeNode;
}
