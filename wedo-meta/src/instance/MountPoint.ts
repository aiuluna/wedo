import { Rect } from "@wedo/utils"
import { CordNew } from "./Cord.new"
import { Node } from "./Node"


export class MountPoint {
  ele: HTMLElement
  node: Node
  cord: CordNew
  constructor(ele: HTMLElement, node: Node, cord: CordNew) {
    this.ele = ele;
    this.node = node;
    this.cord = cord;
  }

  /**
   * 获取当前node挂载节点相对于父挂载节点的rect值
   * @returns Rect
   */
  getRect(): Rect {
    const rect = this.ele.getBoundingClientRect();
    const parent = this.node.getParent();

    // 如果有父节点且父节点有挂载DOM节点，则取相对父节点rect
    if (parent && parent.getMountPoint()) {
      const [dx, dy] = this.positionDiff(parent);
      return new Rect(
        Math.round(dx),
        Math.round(dy),
        Math.round(rect.width),
        Math.round(rect.height)
      )
    }
    // 否则当做root处理
    return new Rect(0, 0, Math.round(rect.width), Math.round(rect.height))
  }

  /**
   * 获取当前mountPoint相对于cord的viewport的绝对position
   * @returns [left, top]
   */
  absPosition(): [number, number] {
    const cord = this.cord;
    if (!cord) {
      throw new Error(`Page is not initialized to node ${this.node.getId()}.`)
    }
    const rect = this.ele.getBoundingClientRect();
    const left = rect.left + cord.scrollX - cord.viewPort.left;
    const top = rect.top + cord.scrollY - cord.viewPort.top;

    return [left, top]
  }

  /**
   * 比较当前节点和传入节点的left和top的差值
   * @param node 
   */
  positionDiff(node: Node) {
    const curRect = this.ele.getBoundingClientRect();
    const nodeEle = node.getMountPoint()!.ele;
    const nodeRect = nodeEle.getBoundingClientRect();
    if (!nodeRect) {
      throw new Error('You cannot call positiondiff on unmounted node.')
    }
    // const childRect = nodeEle.children[0].getBoundingClientRect();
    // const dx = childRect.left - nodeRect.left;
    // const dy = childRect.top - nodeRect.top;

    return [curRect.left - nodeRect.left, curRect.top - nodeRect.top]

  }
}
