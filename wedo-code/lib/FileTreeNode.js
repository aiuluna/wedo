export class FileTreeNode {
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
        node.children = json.children.map(x => FileTreeNode.fromJSON(x));
        return node;
    }
}
