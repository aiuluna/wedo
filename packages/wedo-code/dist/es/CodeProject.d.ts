import { FileTreeNode } from "./FileTreeNode";
import { CodeProjectType, FileNodeJSON, ProjectJSON } from "./types";
export declare class CodeProject {
    private name;
    private type;
    private version;
    private root;
    private scriptUrl?;
    static TemplateNames: {
        codeless: string;
    };
    constructor(name: string, type: CodeProjectType);
    setRootByJSON(root: FileNodeJSON): void;
    setRootNode(node: FileTreeNode): void;
    getRoot(): FileTreeNode;
    getName(): string;
    getType(): "codeless";
    setScriptURL(url: string): void;
    getScriptURL(): string | undefined;
    toJSON(): ProjectJSON;
    incrVer(): void;
    static formJSON(json: ProjectJSON): CodeProject;
}
