import { FileNodeJSON, FileType } from "./types";
export declare class FileTreeNode {
    private fileName;
    private type;
    private children;
    private url?;
    private content?;
    private dirty;
    constructor(fileName: string, type: FileType);
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
    add(child: FileTreeNode): void;
    isDirty(): boolean;
    getUrl(): string | undefined;
    setUrl(url: string): void;
    find(predication: (item: FileTreeNode) => boolean): Generator<FileTreeNode>;
    toJSON(): FileNodeJSON;
    static fromJSON(json: FileNodeJSON): FileTreeNode;
}
