import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _sortInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/sort';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import { fileRemote, codeProjectRemote } from '@wedo/request';

class FileTreeNode {
  constructor(fileName, type, parent) {
    this.children = [];
    // 文件是否被更改
    this.dirty = false;
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
  setFileName(name) {
    this.fileName = name;
  }
  add(child) {
    child.parent = this;
    this.children.push(child);
  }
  remove(child) {
    var _context;
    const filters = _Array$isArray(child) ? child : [child];
    this.children = _reduceInstanceProperty(_context = this.children).call(_context, (prev, curv) => {
      if (!_includesInstanceProperty(filters).call(filters, curv)) prev.push(curv);
      return prev;
    }, []);
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
    var _context2;
    _sortInstanceProperty(_context2 = this.children).call(_context2, (a, b) => {
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
      yield* _findInstanceProperty(child).call(child, predication);
    }
  }
  toJSON() {
    var _context3;
    return {
      fileName: this.fileName,
      type: this.type,
      url: this.url || '',
      children: _mapInstanceProperty(_context3 = this.children).call(_context3, x => x.toJSON())
    };
  }
  static fromJSON(json, parent) {
    var _json$children;
    const node = new FileTreeNode(json.fileName, json.type, parent);
    node.url = json.url;
    node.children = ((_json$children = json.children) == null ? void 0 : _mapInstanceProperty(_json$children).call(_json$children, x => FileTreeNode.fromJSON(x, node))) || [];
    _sortInstanceProperty(node).call(node);
    return node;
  }
}

class CodeProject {
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
  getType() {
    return this.type;
  }
  setScriptURL(url) {
    this.scriptUrl = url;
  }
  getScriptURL() {
    return this.scriptUrl;
  }
  getVersion() {
    return this.version;
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
    this.version++;
  }
  static formJSON(json) {
    const project = new CodeProject(json.name, json.type);
    project.setRootByJSON(json.fileTreeNode);
    project.scriptUrl = json.scriptUrl;
    project.version = json.version;
    return project;
  }
}
CodeProject.TemplateNames = {
  codeless: 'codeless-template',
  faas: 'faas-template'
};

class CodeProjectRepo {
  constructor(project) {
    this.project = project;
  }
  async save(user) {
    let updated = false;
    for (const update of [..._findInstanceProperty(_context = this.project.getRoot()).call(_context, file => file.isDirty())]) {
      var _context;
      const result = await fileRemote.post1('codeless', update.getExt() || "", update.getContent() || "");
      update.setUrl(result.data);
      update.saved();
      updated = true;
    }
    if (updated) {
      this.project.incrVer();
    }
    await codeProjectRemote.put(user, this.project.getName(), this.project.toJSON());
    console.log('project saved.', this.project.toJSON());
  }
  static async load(user, name) {
    const result = await codeProjectRemote.get(user, name);
    console.log("🚀 ~ file: CodeProjectRepo.ts:27 ~ CodeProjectRepo ~ load ~ result:", result);
    const project = CodeProject.formJSON(result.data);
    return project;
  }
}

export { CodeProject, CodeProjectRepo, FileTreeNode };
