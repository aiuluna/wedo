export class Rect {
  left: number;
  top: number;
  width: number;
  height: number;

  constructor(left: number, top: number, width: number, height: number) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  static of(left: number, top: number, width: number, height: number) {
    return new Rect(left, top, width, height)
  }

  static ZERO = new Rect(0, 0, 0, 0)

  public right(): number {
    return this.left + this.width
  }

  public bottom(): number {
    return this.top + this.height
  }

  public boundX(x: number) {
    return this.left <= x && this.right() >= x
  }

  public boundY(y: number): boolean {
    return this.top <= y && this.bottom() >= y
  }

  public bound(x: number, y: number): boolean {
    return this.boundX(x) && this.boundY(y)
  }

  /**
   * 当前Rect是否全包含rect
   * @param rect 
   * @returns boolean
   */
  public contains(rect: Rect): boolean {
    return this.left <= rect.left
      && this.right() >= rect.right()
      && this.top <= rect.top
      && this.bottom() >= rect.bottom()
  }

  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }

  public getTop() {
    return this.top
  }

  public getLeft() {
    return this.left
  }

  /**
   * 返回绝对定位的中心X坐标
   */
  public centerX() {
    return this.left + this.width / 2
  }

  /**
   * 返回绝对定位的中心Y坐标
   */
  public centerY() {
    return this.top + this.height / 2
  }

  public equals(left: number, top: number, width: number, height: number): boolean {
    return this.left === left && this.top === top && this.width === width && this.height === height
  }
}