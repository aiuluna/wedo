import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
export declare class Node extends Emitter<Topic> {
    private nodeData;
    constructor(type: string, x: number, y: number, w: number, h: number);
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
