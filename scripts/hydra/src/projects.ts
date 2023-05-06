import { Package } from "./package";
import { error, notice, hasCycle } from "./utils";
import TreeNode from '../object/TreeNode'
export class Projects {
  constructor(private packages: Array<Package>) {
    this.packages = packages;
  }

  public async install(type?: 'async' | 'sync', name?: string) {
    if (name) {
      notice('isInstalling ~~~' + name);
      this.packages.find(p => p.getName() === name)?.npmInstall();
      return
    }

    if (!type || type === 'sync') {
      this.packages.forEach((pkg) => {
        notice("isInstalling async...", pkg.getDir())
        pkg.npmInstall()
      });
    }
    else {
      for (const pkg of this.packages) {
        notice("isInstalling async...", pkg.getDir())
        await pkg.npmInstall();
      }
    }
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
  public async links() {
    const map = new Map<string, TreeNode<Package>>()
    for (let pkg of this.packages) {
      map.set(pkg.getName(), TreeNode.createNode(pkg))
    }

    for (let [k, v] of map) {
      if (v.getVal().getDevLinks()) {
        v.getVal().getDevLinks().map(name => {
          v.addChild(map.get(name)!)
        })
      }
    }

    const nodes: TreeNode<Package>[] = Array.from(map.values()) || [];

    /* 找出所有需要[npm link]或者[npm link xxx]的节点 */
    const linkNodes = nodes.filter(node => {
      const devLinks = node.getVal().getDevLinks() || [];
      return devLinks.length > 0 || nodes.some(otherNode =>
        otherNode.getVal().getDevLinks()?.includes(node.getVal().getName()))
    })

    /* 找出filterNodes所有根节点 */
    const rootNodes = linkNodes.filter(node => node.getParents().length === 0)

    /* 从每个根节点开始判断是否有环 */
    const _hasCycle = rootNodes.some(node => hasCycle(node))
    if (_hasCycle) {
      error('当前有环状依赖，请检查hydra中的devLinks...')
    }

    /* 递归开始进行npm link */
    const hasLinked = new Set<string>();
    console.log('rootNodes', rootNodes)
    for (let node of rootNodes) {
      await node.getVal().npmLink(map)
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

}
