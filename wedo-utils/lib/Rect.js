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
    /**
     * 当前Rect是否全包含rect
     * @param rect
     * @returns boolean
     */
    contains(rect) {
        return this.left <= rect.left
            && this.right() >= rect.right()
            && this.top <= rect.top
            && this.bottom() >= rect.bottom();
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
    /**
     * 返回绝对定位的中心X坐标
     */
    centerX() {
        return this.left + this.width / 2;
    }
    /**
     * 返回绝对定位的中心Y坐标
     */
    centerY() {
        return this.top + this.height / 2;
    }
    equals(left, top, width, height) {
        return this.left === left && this.top === top && this.width === width && this.height === height;
    }
}
export { Rect };
