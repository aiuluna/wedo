import { Rect } from "@wedo/utils";
import { CordNew } from "./Cord.new";
import { Node } from "./Node";
export declare class MountPoint {
    ele: HTMLElement;
    node: Node;
    cord: CordNew;
    constructor(ele: HTMLElement, node: Node, cord: CordNew);
    /**
     * 获取当前node挂载节点相对于父挂载节点的rect值
     * @returns Rect
     */
    getRect(): Rect;
    /**
     * 获取当前mountPoint相对于cord的viewport的绝对position
     * @returns [left, top]
     */
    absPosition(): [number, number];
    /**
     * 比较当前节点和传入节点的left和top的差值
     * @param node
     */
    positionDiff(node: Node): number[];
}
