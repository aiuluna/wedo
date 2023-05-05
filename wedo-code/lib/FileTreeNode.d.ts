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
    getFileName(): string;
    getFileType(): FileType;
    getChildren(): FileTreeNode[];
    add(child: FileTreeNode): void;
    isDirty(): boolean;
    find(predication: (item: FileTreeNode) => boolean): Generator<FileTreeNode>;
    toJSON(): Record<string, any>;
    static fromJSON(json: FileTreeNodeConfig): FileTreeNode;
}
