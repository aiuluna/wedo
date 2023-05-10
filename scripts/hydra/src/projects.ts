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

    const rootNodes = linkNodes.filter(node => !node.getChildren().length);
    // console.log("rootNodes", rootNodes)

    const result = [];
    const queue = [];

    // 统计入度
    // const inDegree = new Map();
    // for (let node of linkNodes) {
    //   inDegree.set(node.getVal().getName(), 0);
    //   for (let child of node.getChildren()) {
    //     const childName = child.getVal().getName();
    //     inDegree.set(childName, inDegree.get(childName) + 1)
    //   }
    // }
    // console.log("linkNodes", linkNodes)
    const inDegree = calculateInDegree(linkNodes)
    // while(queue.length) {
    //   const node = queue.shift();
    //   result.push(node.getVal().getName())

    //   for (let p of node.getParents()) {
    //     const pName = p.getVal().getName()
    //     if (!inDegree.get(pName))
    //   }
    // }

    console.log(inDegree)

    return


    /* 找出filterNodes所有有依赖的节点 */
    // const childSet = linkNodes.reduce((set, node) => {
    //   node.getChildren().forEach(c => set.add(c))
    //   return set;
    // }, new Set<TreeNode<Package>>());
    // const rootNodes = Array.from(childSet).filter(s => s.getChildren().length)

    // // console.log('childSet', childSet);
    // console.log('rootNodes', rootNodes)
    // return


    /* 从每个根节点开始判断是否有环 */
    // const _hasCycle = rootNodes.some(node => hasCycle(node))
    // if (_hasCycle) {
    //   error('当前有环状依赖，请检查hydra中的devLinks...')
    // }

    /* 递归开始进行npm link */
    const hasLinked = new Set<string>();
    for (let node of linkNodes) {
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


// function calculateInDegree(nodes: TreeNode<Package>[], inDegree = new Map()): Map<string, TreeNode<Package>> {
//   if (!nodes.length) return inDegree;
//   for (let node of nodes) {
//     const name = node.getVal().getName()
//     if (!inDegree.get(name)) inDegree.set(name, 0);
//     inDegree.set(name, inDegree.get(name) + 1)
//     calculateInDegree(node.getChildren(), inDegree)
//   }
//   return inDegree;
// }

/**
 * 计算入度
 * @param rootNodes 
 * @returns 
 */
function calculateInDegree(rootNodes: TreeNode<Package>[]): Map<string, number> {
  const inDegreeMap = new Map<string, number>();
  const queue: TreeNode<Package>[] = Array.from(rootNodes);

  while (queue.length > 0) {
    const node = queue.shift()!;
    const name = node.getVal().getName();
    inDegreeMap.set(name, inDegreeMap.get(name) || 0);

    for (let parent of node.getParents()) {
      const parentName = parent.getVal().getName();
      inDegreeMap.set(parentName, (inDegreeMap.get(parentName) || 0) + 1);
      if (![...inDegreeMap.keys()].includes(parentName)) {
        queue.push(parent);
      }
    }
  }

  return inDegreeMap;
}

// function calculateInDegree(rootNodes: TreeNode<Package>[]): Map<string, number> {
//   const inDegreeMap = new Map<string, number>();

//   for (let rootNode of rootNodes) {
//     if (hasCycle(rootNode)) {
//       throw new Error('The package dependencies contain cycles.');
//     }
//   }

//   function hasCycle(node: TreeNode<Package>, visitedSet = new Set<TreeNode<Package>>(), path = new Set<TreeNode<Package>>()): boolean {
//     visitedSet.add(node);
//     path.add(node);

//     for (let parent of node.getParents()) {
//       if (!visitedSet.has(parent) && hasCycle(parent, visitedSet, path)) {
//         return true;
//       } else if (path.has(parent)) {
//         return true;
//       }
//     }

//     path.delete(node);
//     return false;
//   }

//   const queue: TreeNode<Package>[] = Array.from(rootNodes);

//   while (queue.length > 0) {
//     const node = queue.shift()!;
//     const name = node.getVal().getName();
//     inDegreeMap.set(name, inDegreeMap.get(name) || 0);

//     for (let parent of node.getParents()) {
//       const parentName = parent.getVal().getName();
//       inDegreeMap.set(parentName, (inDegreeMap.get(parentName) || 0) + 1);
//       if (![...inDegreeMap.keys()].includes(parentName)) {
//         queue.push(parent);
//       }
//     }
//   }

//   return inDegreeMap;
// }
