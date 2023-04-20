import { Rect } from "@wedo/utils";
/**
 * 新的画布对象
 */
export declare class CordNew {
    viewPort: Rect;
    stage: Rect;
    scrollX: number;
    scrollY: number;
    constructor(stage: Rect);
    /**
     * 计算相对于当前画布的客户端坐标ClientX
     * @param clientX 当前节点的clientX
     * @returns
     */
    worldX(clientX: number): number;
    /**
     * 计算相对于当前画布的客户端坐标ClientY
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
