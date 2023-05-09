"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTreeNode = void 0;
class FileTreeNode {
    fileName;
    type;
    children = [];
    // oss，文件地址
    url;
    // 内存中的文件内容，硬盘或者OSS文件内容不会存
    content;
    // 文件是否被更改
    dirty = false;
    constructor(fileName, type) {
        this.fileName = fileName;
        this.type = type;
    }
    setContent(content) {
        if (this.content !== content) {
            this.content = content;
            this.dirty = true;
        }
    }
    getContent() {
        return this.content;
    }
    saved() {
        this.dirty = false;
    }
    /**
     * 获取文件扩展名
     */
    getExt() {
        const prts = this.fileName.split('.');
        return prts.length > 1 ? prts.pop() : '';
    }
    getFileName() {
        return this.fileName;
    }
    getFileType() {
        return this.type;
    }
    getChildren() {
        return this.children;
    }
    add(child) {
        this.children.push(child);
    }
    isDirty() {
        return this.dirty;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    *find(predication) {
        if (predication(this)) {
            yield this;
        }
        for (let child of this.children) {
            yield* child.find(predication);
        }
    }
    toJSON() {
        return {
            fileName: this.fileName,
            type: this.type,
            url: this.url || '',
            children: this.children.map(x => x.toJSON())
        };
    }
    static fromJSON(json) {
        const node = new FileTreeNode(json.fileName, json.type);
        node.url = json.url;
        node.children = json.children?.map(x => FileTreeNode.fromJSON(x)) || [];
        return node;
    }
}
exports.FileTreeNode = FileTreeNode;
