import { Rect } from "@wedo/utils";
/**
 * 新的画布对象
 */
export class CordNew {
    viewPort; // 表示画布的可视区域，初始化时是Rect.ZERO
    stage; // 表示画布的大小和位置
    scrollX;
    scrollY;
    constructor(stage) {
        this.viewPort = Rect.ZERO;
        this.stage = stage;
        this.scrollX = 0;
        this.scrollY = 0;
    }
    /**
     * 计算相对于当前画布的客户端坐标ClientX
     * @param clientX 当前节点的clientX
     * @returns
     */
    worldX(clientX) {
        return Math.round(clientX + this.scrollX - this.viewPort.left);
    }
    /**
     * 计算相对于当前画布的客户端坐标ClientY
     * @param clientY 当前节点的clientY
     * @returns
     */
    worldY(clientY) {
        return Math.round(clientY + this.scrollY - this.viewPort.top);
    }
    /**
     * 更新scroll
     * @param scrollX 当前scrollx
     * @param scrollY 当前scrolly
     */
    updateScroll(scrollX, scrollY) {
        this.scrollX = Math.round(scrollX);
        this.scrollY = Math.round(scrollY);
    }
    setViewPort(rect) {
        this.viewPort = rect;
    }
}
