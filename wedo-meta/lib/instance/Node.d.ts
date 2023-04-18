import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types';
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';
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
    getName(): any;
    getData(): NodeData;
    getParent(): Node;
    getRect(): Rect;
    getBox(): BoxDescriptor;
    addToRelative(node: Node, position?: [number, number]): void;
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
    absPosition(): Array<number>;
    bound(x: number, y: number): boolean;
    isContainer(): boolean;
    getType(): any;
    getX(): any;
    getY(): any;
    getW(): any;
    getH(): any;
    getChildren(): any;
    setXY(vec: [number, number]): void;
    printData(): void;
}
