import { CustomResponse } from "../standard";
export declare class CodeProjectService {
    put(user: string, name: string, values: any): Promise<CustomResponse>;
    get(user: string, name: string): Promise<CustomResponse>;
    build: BuildService;
    faas: FaasService;
}
declare class BuildService {
    put(user: string, name: string): Promise<CustomResponse>;
}
declare class FaasService {
    get(user: string, project: string, fnName: string, ...args: string[]): Promise<CustomResponse>;
}
export {};
