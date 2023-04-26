import { FileTreeNodeConfig, FileType } from "./types";

export class FileTreeNode {

  private children: FileTreeNode[] = [];

  // oss，文件地址
  private url?: string;

  // 内存中的文件内容，硬盘或者OSS文件内容不会存
  private content?: string;

  // 文件是否被更改
  private dirty: boolean = false;

  constructor(private fileName: string, private type: FileType) {
  }

  public setContent(content: string) {
    if (this.content !== content) {
      this.content = content;
      this.dirty = true
    }    
  }

  public saved() {
    this.dirty = false
  }

  /**
   * 获取文件扩展名
   */
  public getExt() {
    const prts = this.fileName.split('.');
    return prts.length > 1 ? prts.pop() : ''
  }

  public toJSON(): Record<string, any> {
    return {
      fileName: this.fileName,
      type: this.type,
      url: this.url || '',
      children: this.children.map(x => x.toJSON())
    }
  }

  public static fromJSON(json: FileTreeNodeConfig): FileTreeNode {
    const node = new FileTreeNode(json.fileName, json.type);
    node.url = json.url;
    node.children = json.children.map(x => FileTreeNode.fromJSON(x))
    return node
  }
}

