import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileTreeNodeConfig, ProjectJSON } from "./types";
export declare class CodeProject {
    private name;
    private type;
    private version;
    private root;
    static TemplateNames: {
        codeless: 'codeless-template';
    };
    constructor(name: string, type: CodeProjectType);
    setRoot(root: FileTreeNodeConfig): void;
    setRootNode(node: FileTreeNode): void;
    getRoot(): FileTreeNode;
    getName(): string;
    getJSON(): ProjectJSON;
}
