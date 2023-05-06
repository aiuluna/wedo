export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
    static of(left: number, top: number, width: number, height: number): Rect;
    static ZERO: Rect;
    right(): number;
    bottom(): number;
    boundX(x: number): boolean;
    boundY(y: number): boolean;
    bound(x: number, y: number): boolean;
    /**
     * 当前Rect是否全包含rect
     * @param rect
     * @returns boolean
     */
    contains(rect: Rect): boolean;
    getWidth(): number;
    getHeight(): number;
    getTop(): number;
    getLeft(): number;
    /**
     * 返回绝对定位的中心X坐标
     */
    centerX(): number;
    /**
     * 返回绝对定位的中心Y坐标
     */
    centerY(): number;
    equals(left: number, top: number, width: number, height: number): boolean;
}
