export type CodeProjectType = 'codeless';
export type FileType = 'dir' | 'file';
export type FileTreeNodeConfig = {
    fileName: string;
    type: FileType;
    url: string;
    children: FileTreeNodeConfig[];
};
