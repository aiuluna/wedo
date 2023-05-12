import { CustomResponse } from "../standard";
export declare class CodeProjectService {
    put(user: string, name: string, values: any): Promise<CustomResponse>;
    get(user: string, name: string): Promise<CustomResponse>;
    build: BuildService;
}
declare class BuildService {
    put(user: string, name: string): Promise<CustomResponse>;
}
export {};
