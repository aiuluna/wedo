import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileTreeNodeConfig } from "./types";
export declare class CodeProject {
    private name;
    private type;
    private version;
    private root;
    constructor(name: string, type: CodeProjectType);
    setRoot(root: FileTreeNodeConfig): void;
    setRootNode(node: FileTreeNode): void;
    getRoot(): FileTreeNode;
    getName(): string;
    getJSON(): {
        name: string;
        type: "codeless";
        version: number;
        scriptUrl: string;
        fileTreeNode: Record<string, any>;
    };
}
