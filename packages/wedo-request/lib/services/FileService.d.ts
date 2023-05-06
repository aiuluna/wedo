import { CustomResponse } from "../standard";
export declare class FileService {
    post1(bucket: string, ext: string, content: string): Promise<CustomResponse>;
}
