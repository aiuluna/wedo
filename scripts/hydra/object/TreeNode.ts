export default class TreeNode<T> {
  private children: TreeNode<T>[];
  private parents: TreeNode<T>[];

  private constructor(private val: T) {
    this.val = val;
    this.children = []
    this.parents = []
  }

  static createNode<U>(val: U) {
    return new TreeNode<U>(val)
  }

  addChild(child: TreeNode<T>) {
    this.children.push(child);
    child.addParent(this)
  }

  addParent(parent: TreeNode<T>) {
    this.parents.push(parent);
  }

  getChildren(): TreeNode<T>[] {
    return this.children
  }

  getParents(): TreeNode<T>[] {
    return this.parents
  }

  getVal(): T {
    return this.val
  }
}