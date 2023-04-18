import { Rect } from "@wedo/utils";
export declare class CordNew {
    viewPort: Rect;
    stage: Rect;
    scrollX: number;
    scrollY: number;
    constructor(stage: Rect);
    /**
     * 返回相对当前画布的clientX
     * @param clientX 当前节点的clientX
     * @returns
     */
    worldX(clientX: number): number;
    /**
     * 返回相对当前画布的clientY
     * @param clientY 当前节点的clientY
     * @returns
     */
    worldY(clientY: number): number;
    /**
     * 更新scroll
     * @param scrollX 当前scrollx
     * @param scrollY 当前scrolly
     */
    updateScroll(scrollX: number, scrollY: number): void;
    setViewPort(rect: Rect): void;
}
