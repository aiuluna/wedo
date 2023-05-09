import { CodeProject } from '@wedo/code';
export declare class CodeProjectFS {
    private cwd;
    constructor(cwd: string);
    private createFileNode;
    upload(user: string, project: CodeProject): Promise<void>;
    private downloadFile;
    download(user: string, name: string): Promise<CodeProject>;
    static createTemplates(): Promise<void>;
}
