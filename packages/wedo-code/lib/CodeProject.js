import { FileTreeNode } from "./FileTreeNode";
export class CodeProject {
    name;
    type;
    version;
    root;
    static TemplateNames;
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.version = 0;
        this.root = new FileTreeNode('root', 'dir');
    }
    setRoot(root) {
        this.root = FileTreeNode.fromJSON(root);
    }
    setRootNode(node) {
        this.root = node;
    }
    getRoot() {
        return this.root;
    }
    getName() {
        return this.name;
    }
    getJSON() {
        return {
            name: this.name,
            type: this.type,
            version: this.version,
            scriptUrl: '',
            fileTreeNode: this.root.toJSON()
        };
    }
}
