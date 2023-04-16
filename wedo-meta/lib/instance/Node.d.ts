import { Emitter, Rect } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types';
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';
export declare class Node extends Emitter<Topic> {
    private data;
    private mountPoint?;
    meta: ComponentMeta;
    constructor(meta: ComponentMeta, data: NodeData);
    setInstanceData(key: string, value: any): void;
    updateInstanceData(key: string, updator: (value: any) => any): void;
    updateInstanceByPath(path: Array<string>, value: any): void;
    getData(): NodeData;
    getParent(): Node;
    getRect(): Rect;
    getBox(): BoxDescriptor;
    add(child: Node): void;
    getType(): any;
    getX(): any;
    getY(): any;
    getW(): any;
    getH(): any;
    getChildren(): any;
    setXY(vec: [number, number]): void;
    printData(): void;
}
