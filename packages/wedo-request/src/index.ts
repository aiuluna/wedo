import { CodeProjectService } from "./services/CodeProjectService";
import { FileService } from "./services/FileService";
import { PageService } from "./services/PageService";

export const fileRemote = new FileService()
export const codeProjectRemote = new CodeProjectService()
export const pageRemote = new PageService()
export * from "./compose"
