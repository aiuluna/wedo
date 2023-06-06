import { FileNodeJSON, FileType } from "./types";
export declare class FileTreeNode {
    private fileName;
    private type;
    private parent?;
    private children;
    private url?;
    private content?;
    private dirty;
    constructor(fileName: string, type: FileType, parent?: FileTreeNode | undefined);
    setContent(content: string): void;
    getContent(): string | undefined;
    saved(): void;
    /**
     * 获取文件扩展名
     */
    getExt(): string | undefined;
    getFileName(): string;
    getFileType(): FileType;
    getChildren(): FileTreeNode[];
    getParent(): FileTreeNode | undefined;
    setFileName(name: string): void;
    add(child: FileTreeNode): void;
    remove(child: FileTreeNode | FileTreeNode[]): void;
    isDirty(): boolean;
    getUrl(): string | undefined;
    setUrl(url: string): void;
    /**
     * 目录在前，文件在后
     */
    sort(): void;
    find(predication: (item: FileTreeNode) => boolean): Generator<FileTreeNode>;
    toJSON(): FileNodeJSON;
    static fromJSON(json: FileNodeJSON, parent?: FileTreeNode): FileTreeNode;
}
