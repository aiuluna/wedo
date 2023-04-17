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
    right() {
        return this.left + this.width;
    }
    bottom() {
        return this.top + this.height;
    }
    boundX(x) {
        return this.left <= x && this.right() >= x;
    }
    boundY(y) {
        return this.top <= y && this.bottom() >= y;
    }
    bound(x, y) {
        return this.boundX(x) && this.boundY(y);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getTop() {
        return this.top;
    }
    getLeft() {
        return this.left;
    }
}
export { Rect };
