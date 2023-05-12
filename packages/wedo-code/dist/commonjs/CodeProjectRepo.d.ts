import { CodeProject } from "./CodeProject";
export declare class CodeProjectRepo {
    private project;
    constructor(project: CodeProject);
    save(user: string): Promise<void>;
}
