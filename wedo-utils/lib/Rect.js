class Rect {
    left;
    top;
    width;
    height;
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    static of(left, top, width, height) {
        return new Rect(left, top, width, height);
    }
    static ZERO = new Rect(0, 0, 0, 0);
}
export { Rect };
