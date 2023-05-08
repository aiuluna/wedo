import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileNodeJSON, ProjectJSON } from "./types";
export declare class CodeProject {
    private name;
    private type;
    private version;
    private root;
    static TemplateNames: {
        codeless: string;
    };
    constructor(name: string, type: CodeProjectType);
    setRootByJSON(root: FileNodeJSON): void;
    setRootNode(node: FileTreeNode): void;
    getRoot(): FileTreeNode;
    getName(): string;
    toJSON(): ProjectJSON;
    incrVer(): void;
    static formJSON(json: ProjectJSON): CodeProject;
}
