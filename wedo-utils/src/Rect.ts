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
}