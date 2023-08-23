export interface ConfigAttributes {
    uploadFileObject: string;
    uploadFileText: string;
    codeProjectURL: (user: string, name: string) => string;
    codeProjectBuildURL: (user: string, name: string) => string;
    pageUrl: (user?: string, name?: string) => string;
    faasRunner: (user: string, project: string, fnName: string, ...args: string[]) => string;
}
