export type CodeProjectType = 'codeless';
export type FileType = 'dir' | 'file';
export type FileTreeNodeConfig = {
    fileName: string;
    type: FileType;
    url: string;
    children?: FileTreeNodeConfig[];
};
export type FileNodeJSON = {
    fileName: string;
    type: FileType;
    url?: string;
    children: FileNodeJSON[];
};
export type ProjectJSON = {
    name: string;
    type: string;
    version: number;
    scriptUrl?: string;
    fileTreeNode: FileNodeJSON;
};
