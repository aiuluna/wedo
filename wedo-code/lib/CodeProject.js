"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProject = void 0;
const FileTreeNode_1 = require("./FileTreeNode");
class CodeProject {
    name;
    type;
    version;
    root;
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.version = 0;
        this.root = new FileTreeNode_1.FileTreeNode('root', 'dir');
    }
    setRoot(root) {
        this.root = FileTreeNode_1.FileTreeNode.fromJSON(root);
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
exports.CodeProject = CodeProject;
