import { Node } from "@wedo/meta";
import { Rect } from "@wedo/utils";

/**
 * 找到拖拽节点在所有children中的该在的位置下标
 * @param children 
 * @param movingNode 
 * @param type 
 */
export function getFlexGap(children: Array<Node>, movingNode: Node, type = 'row') {

  function midVal(rect: Rect) {
    if (type === 'row') {
      return rect.centerX()
    } else {
      return rect.centerY()
    }
  }
  // 找到所有不是当前移动节点的children
  children = children.filter(child => child !== movingNode);
  // 对children进行遍历，找到所有节点的中心位置
  let values: number[] = [];
  children.forEach(child => {
    values.push(midVal(child.getRect()))
  })
  // 找到移动节点的中心位置
  const movingNodeMid = midVal(movingNode.getRect());
  // 防止找不到比移动节点大的中心点，数组放入最大值，可以返回最大值的下标
  values.push(Number.MAX_SAFE_INTEGER)

  return values.findIndex(val => val > movingNodeMid)
}
