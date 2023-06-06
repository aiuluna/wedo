export declare class CodeRunner {
    private cwd;
    private user;
    private project;
    constructor(cwd: string, user: string, project: string);
    private loadProjectStatus;
    private prepare;
    private build;
    run(fnName: string, ...args: any[]): Promise<any>;
}
