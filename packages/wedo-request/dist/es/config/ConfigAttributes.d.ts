export interface ConfigAttributes {
    uploadFileObject: string;
    uploadFileText: string;
    codeProjectURL: (user: string, name: string) => string;
    codeProjectBuildURL: (user: string, name: string) => string;
}
