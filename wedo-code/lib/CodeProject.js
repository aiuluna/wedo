import { FileTreeNode } from "./FileTreeNode";
export class CodeProject {
    name;
    type;
    version;
    root;
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.version = 0;
        this.root = new FileTreeNode('root', 'dir');
    }
    setRoot(root) {
        this.root = FileTreeNode.fromJSON(root);
    }
    getRoot() {
        return this.root;
    }
}
