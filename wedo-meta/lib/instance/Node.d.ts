import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types';
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';
import { MountPoint } from './MountPoint';
export declare class Node extends Emitter<Topic> {
    private data;
    private mountPoint?;
    meta: ComponentMeta;
    logger: Logger;
    level: number;
    constructor(meta: ComponentMeta, data: NodeData);
    getId(): number;
    setInstanceData(key: string, value: any): void;
    updateInstanceData(key: string, updator: (value: any) => any): void;
    updateInstanceByPath(path: Array<string>, value: any): void;
    getMountPoint(): MountPoint | undefined;
    getName(): any;
    getData(): NodeData;
    getParent(): Node;
    /**
     * 获取当前node的MountPoint的Rect,没有挂载则返回Rect.ZERO
     * @returns Rect
     */
    getRect(): Rect;
    getBox(): BoxDescriptor;
    addToRelative(node: Node, position?: [number, number]): void;
    /**
     * 给当前节点添加绝对定位的node子节点
     * @param node
     * @param position 绝对定位position
     */
    addToAbsolute(node: Node, position?: [number, number]): void;
    setAllowDrag(allowDrag: boolean): void;
    private sortChildren;
    isFlex(): boolean;
    add(child: Node): void;
    remove(node: Node): void;
    setChildren(children: Array<Node>): void;
    setParent(node: Node | null): void;
    /**
     * 获取当前节点的绝对定位的Rect
     * @returns
     */
    absRect(): Rect;
    /**
     * 获取当前节点的绝对定位坐标
     * @returns [x, y]
     */
    absPosition(): [number, number];
    bound(x: number, y: number): boolean;
    isContainer(): boolean;
    getType(): any;
    getX(): any;
    getY(): any;
    getW(): any;
    getH(): any;
    getChildren(): any;
    setXY(vec: [number, number]): void;
    /**
     * 根据偏移量设置xy
     * @param vec [diffX, diffY]
     */
    setXYByVec(vec: [number, number]): void;
    setXYWH(left: number, top: number, width: number, height: number): void;
    /**
     * 根据mountPoint的rect更新节点的盒子模型
     */
    updateFromMountPoint(): void;
    printData(): void;
}
