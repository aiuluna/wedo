export class FileTreeNode {
    fileName;
    type;
    parent;
    children = [];
    // oss，文件地址
    url;
    // 内存中的文件内容，硬盘或者OSS文件内容不会存
    content;
    // 文件是否被更改
    dirty = false;
    constructor(fileName, type, parent) {
        this.fileName = fileName;
        this.type = type;
        this.parent = parent;
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
    getParent() {
        return this.parent;
    }
    add(child) {
        child.parent = this;
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
    /**
     * 目录在前，文件在后
     */
    sort() {
        this.children.sort((a, b) => {
            if (a.getFileType() === 'dir' && b.getFileType() !== 'dir') {
                return -1;
            }
            if (a.getFileType() !== 'dir' && b.getFileType() === 'dir') {
                return 1;
            }
            return 0;
        });
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
    static fromJSON(json, parent) {
        const node = new FileTreeNode(json.fileName, json.type, parent);
        node.url = json.url;
        node.children = json.children?.map(x => FileTreeNode.fromJSON(x, node)) || [];
        node.sort();
        return node;
    }
}
