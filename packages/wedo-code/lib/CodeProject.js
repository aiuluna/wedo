import { FileTreeNode } from "./FileTreeNode";
class CodeProject {
    name;
    type;
    version;
    root;
    static TemplateNames = {
        codeless: 'codeless-template'
    };
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.version = 0;
        this.root = new FileTreeNode('root', 'dir');
    }
    setRootByJSON(root) {
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
    toJSON() {
        return {
            name: this.name,
            type: this.type,
            version: this.version,
            scriptUrl: '',
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
export { CodeProject };
