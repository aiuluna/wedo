"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProjectFS = void 0;
const code_1 = require("@wedo/code");
const request_1 = require("@wedo/request");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 处理文件上传等上下文类
class CodeProjectFS {
    cwd;
    constructor(cwd) {
        this.cwd = cwd;
    }
    // 根据dir在内存中生成FileTreeNode
    createFileNode(dir, name) {
        const files = fs_1.default.readdirSync(dir);
        const fNode = new code_1.FileTreeNode(name, 'dir');
        for (let file of files) {
            const fullName = path_1.default.resolve(dir, file);
            if (fs_1.default.statSync(fullName).isDirectory()) {
                fNode.add(this.createFileNode(fullName, file));
            }
            else {
                const fileNode = new code_1.FileTreeNode(file, 'file');
                fileNode.setContent(fs_1.default.readFileSync(fullName, 'utf-8'));
                fNode.add(fileNode);
            }
        }
        return fNode;
    }
    async upload(user, project) {
        const fileNode = this.createFileNode(this.cwd, '');
        project.setRootNode(fileNode);
        const shouldUpdates = [...fileNode.find(x => x.isDirty())];
        for (let file of shouldUpdates) {
            const result = await request_1.fileRemote.post1('/code', file.getExt(), file.getContent());
            file.setUrl(result.data);
            file.saved();
        }
        const result = await request_1.codeProjectRemote.put(user, project.getName(), project.toJSON());
        if (!result.success) {
            throw new Error('upload failed:' + result.data);
        }
    }
    async downloadFile(base, node) {
        const targetPath = path_1.default.resolve(base, node.getFileName());
        if (node.getFileType() === 'dir') {
            if (fs_1.default.existsSync(targetPath)) {
                fs_1.default.rmSync(targetPath, { recursive: true, force: true });
            }
            fs_1.default.mkdirSync(targetPath);
            for (let child of node.getChildren()) {
                await this.downloadFile(targetPath, child);
            }
            return;
        }
        const result = await request_1.fileRemote.get(node.getUrl());
        const content = result.data;
        node.setContent(content);
        node.saved();
        fs_1.default.writeFileSync(targetPath, node.getContent(), "utf-8");
    }
    async download(user, name) {
        console.log("fs---download", name);
        const result = await request_1.codeProjectRemote.get(user, name);
        const json = result.data;
        const project = code_1.CodeProject.formJSON(json);
        await this.downloadFile(this.cwd, project.getRoot());
        return project;
    }
    static async createTemplates() {
        for (let key in code_1.CodeProject.TemplateNames) {
            const template = code_1.CodeProject.TemplateNames[key];
            const project = new code_1.CodeProject(template, key);
            const fs = new CodeProjectFS(path_1.default.resolve(__dirname, '../template', key));
            await fs.upload("template", project);
        }
    }
}
exports.CodeProjectFS = CodeProjectFS;
