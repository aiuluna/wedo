import { FileTreeNodeConfig, FileType } from "./types";
export declare class FileTreeNode {
    private fileName;
    private type;
    private children;
    private url?;
    private content?;
    private dirty;
    constructor(fileName: string, type: FileType);
    setContent(content: string): void;
    saved(): void;
    /**
     * 获取文件扩展名
     */
    getExt(): string | undefined;
    toJSON(): Record<string, any>;
    static fromJSON(json: FileTreeNodeConfig): FileTreeNode;
}
