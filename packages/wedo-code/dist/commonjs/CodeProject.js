"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProject = void 0;
const FileTreeNode_1 = require("./FileTreeNode");
class CodeProject {
    name;
    type;
    version;
    root;
    scriptUrl;
    static TemplateNames = {
        codeless: 'codeless-template'
    };
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.version = 0;
        this.root = new FileTreeNode_1.FileTreeNode('root', 'dir');
    }
    setRootByJSON(root) {
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
    getType() {
        return this.type;
    }
    setScriptURL(url) {
        this.scriptUrl = url;
    }
    toJSON() {
        return {
            name: this.name,
            type: this.type,
            version: this.version,
            scriptUrl: this.scriptUrl || "",
            fileTreeNode: this.root.toJSON()
        };
    }
    incrVer() {
        this.version = this.version++;
    }
    static formJSON(json) {
        const project = new CodeProject(json.name, json.type);
        project.setRootByJSON(json.fileTreeNode);
        return project;
    }
}
exports.CodeProject = CodeProject;
