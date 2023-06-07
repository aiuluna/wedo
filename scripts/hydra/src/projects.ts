import { Package } from "./package";
import { error, notice, hasCycle } from "./utils";
import TreeNode from '../object/TreeNode'
import Graph from "./Graph";
export class Projects {
  constructor(private packages: Array<Package>) {
    this.packages = packages;
  }

  public async install(type?: 'async' | 'sync', name?: string) {
    if (!type) type = 'sync';
    if (name) {
      notice('isInstalling ~~~' + name);
      const set = new Set<Package>();
      this.findDepedences(name, set);
      return await this.runInstallByType(type, Array.from(set))
    }
    return await this.runInstallByType(type, this.packages);
  }

  public async reInstall(type?: 'async' | 'sync', name?: string) {
    if (name) {
      notice('isReInstalling ~~~' + name);
      this.packages.find(p => p.getName() === name)?.reNpmInstall();
      return
    }
    if (!type || type === 'sync') {
      this.packages.forEach((pkg) => {
        notice('isReInstalling sync...', pkg.getDir())
        pkg.reNpmInstall()
      });
    } else {
      for (const pkg of this.packages) {
        notice('isReInstalling async...', pkg.getDir())
        await pkg.reNpmInstall()
      }
    }
  }

  /**
   * 构建依赖树
   */
  public async links(pkgName?: string) {
    const map = new Map<string, TreeNode<Package>>()
    for (let pkg of this.packages) {
      const [name, node] = [pkg.getName(), TreeNode.createNode(pkg)];
      map.set(name, node);
    }

    // 构建依赖关系
    for (let [k, v] of map) {
      if (v.getVal().getDevLinks()) {
        v.getVal().getDevLinks().map(name => {
          v.addChild(map.get(name)!)
        })
      }
    }

    const nodes: TreeNode<Package>[] = Array.from(map.values()) || [];

    let linkNodes: TreeNode<Package>[] = []
    if (pkgName) {
      const linksSet = new Set<TreeNode<Package>>()
      this.findDevLinks(map.get(pkgName), linksSet)
      linkNodes = Array.from(linksSet)
    } else {
      //找出所有需要[npm link]或者[npm link xxx]的节点         
      linkNodes = nodes.filter(node => {
        const devLinks = node.getVal().getDevLinks() || [];
        return devLinks.length > 0 || nodes.some(otherNode =>
          otherNode.getVal().getDevLinks()?.includes(node.getVal().getName()))
      })
    }

    console.log('linkNodes ===> ' + linkNodes.length)
    /* 构建拓扑图 */
    const graph = linkNodes.reduce((graph, node) => {
      node.getChildren().map(child => graph.addEdge(child, node))
      return graph;
    }, new Graph<TreeNode<Package>>(linkNodes))

    // 拓扑排序
    const inDegree = new Map<TreeNode<Package>, number>();
    for (let [key, _] of graph.getAdj()) {
      inDegree.set(key, 0)
    }

    for (let [_, value] of graph.getAdj()) {
      for (let linked of [...value.find()]) {
        inDegree.set(linked.val, (inDegree.get(linked.val) || 0) + 1)
      }
    }

    const queue: TreeNode<Package>[] = [];
    for (let [k, v] of inDegree) {
      if (v === 0) queue.push(k)
    }

    const visited = new Set<String>();
    while (queue.length) {
      const top = queue.shift();
      if (visited.has(top.getVal().getName())) {
        throw new Error('devlinks has cycle')
      }
      visited.add(top.getVal().getName())
      console.log('->', top.getVal().getName())
      await top.getVal().npmLink()
      for (let t of graph.getAdj().get(top).find()) {
        inDegree.set(t.val, inDegree.get(t.val) - 1)
        if (inDegree.get(t.val) === 0) queue.push(t.val)
      }
    }
  }

  public async clear() {
    this.packages.forEach((pkg) => {
      notice('isClearing...', pkg.getDir())
      pkg.npmClear()
    });
  }

  public list() {
    this.packages.forEach((pkg) => {
      console.log('<pkg ' + pkg.getName() + "@" + pkg.getVersion()?.join('.') + '>')
      console.log('  type', pkg.getHydraType())
      console.log('  name', pkg.getName())
      console.log('  version', pkg.getVersion()?.join('.'))
      console.log('  links', pkg.getDevLinks()?.join(' '))
    })
  }

  public async build(name: string) {
    const pkg = this.findPackage(name);;
    await pkg?.build()
  }

  public async serve(name: string) {
    const pkg = this.findPackage(name);;
    await pkg?.serve()
  }

  public getRunnables() {
    return this.packages.filter(p => p.isRunnable())
  }

  public findPackage(name: string): Package | undefined {
    if (!name) {
      error('name is required!')
      return
    }
    return this.packages.find(p => p.getName() === name)
  }

  private findDevLinks(node: TreeNode<Package>, set: Set<TreeNode<Package>>) {
    set.add(node);
    for (let child of node.getChildren()) {
      this.findDevLinks(child, set)
    }
  }

  private findDepedences(pkgName: string, set: Set<Package>) {
    const pkg = this.findPackage(pkgName)
    if (pkg) {
      set.add(pkg);
      for (let child of pkg.getDevLinks()) {
        this.findDepedences(child, set)
      }
    }
  }

  private async runInstallByType(type: 'async' | 'sync', pkgs: Package[]) {
    if (type === 'async') {
      await Promise.all(pkgs.map(pkg => pkg.npmInstall()))
    } else {
      for (let pkg of pkgs) {
        await pkg.npmInstall()
      }
    }
  }
}