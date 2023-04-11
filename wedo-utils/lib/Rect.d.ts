export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
    static of(left: number, top: number, width: number, height: number): Rect;
    static ZERO: Rect;
    getWidth(): number;
    getHeight(): number;
    getTop(): number;
    getLeft(): number;
}
