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

  right() : number{
    return this.left + this.width
  }

  bottom() : number{
    return this.top + this.height
  }

  boundX(x : number){
    return this.left <= x && this.right() >= x
  }

  boundY(y : number) : boolean{
    return this.top <= y && this.bottom() >= y 
  }

  bound(x : number, y : number) : boolean{
    return this.boundX(x) && this.boundY(y)
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

}