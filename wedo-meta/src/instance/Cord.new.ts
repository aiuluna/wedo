import { Rect } from "@wedo/utils";

export class CordNew {
  viewPort: Rect;
  stage: Rect;
  scrollX: number;
  scrollY: number;
  constructor(stage: Rect) {
    this.viewPort = Rect.ZERO
    this.stage = stage
    this.scrollX = 0
    this.scrollY = 0
  }

  /**
   * 返回相对当前画布的clientX
   * @param clientX 当前节点的clientX
   * @returns 
   */
  worldX(clientX: number) {
    return Math.round(clientX + this.scrollX - this.viewPort.left)
  }

  /**
   * 返回相对当前画布的clientY
   * @param clientY 当前节点的clientY
   * @returns 
   */
  worldY(clientY: number) {
    return Math.round(clientY + this.scrollY - this.viewPort.top)
  }

  /**
   * 更新scroll
   * @param scrollX 当前scrollx
   * @param scrollY 当前scrolly
   */
  updateScroll(scrollX: number, scrollY: number) {
    this.scrollX = Math.round(scrollX)
    this.scrollY = Math.round(scrollY)
  }

  setViewPort(rect: Rect) {    
    this.viewPort = rect
  } 
}