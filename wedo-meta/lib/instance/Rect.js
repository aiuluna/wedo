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
    copyFrom(rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    }
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
    contains(rect) {
        return this.left <= rect.left
            && this.right() >= rect.right()
            && this.top <= rect.top
            && this.bottom() >= rect.bottom();
    }
    area() {
        return this.width * this.height;
    }
    intersect(rect) {
        const lmax = Math.max(rect.left, this.left);
        const rmin = Math.min(rect.right(), this.right());
        const tmax = Math.max(rect.top, this.top);
        const bmin = Math.min(rect.bottom(), this.bottom());
        if (lmax >= rmin || tmax >= bmin) {
            return null;
        }
        return new Rect(lmax, tmax, rmin - lmax, bmin - tmax);
    }
    apply(x, y, width, height) {
        const rect = this.clone();
        rect.left += x;
        rect.top += y;
        rect.width += width;
        rect.height += height;
        return rect;
    }
    replace(rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    }
    clone() {
        return new Rect(this.left, this.top, this.width, this.height);
    }
    centerX() {
        return this.left + this.width / 2;
    }
    centerY() {
        return this.top + this.height / 2;
    }
    equals(left, top, width, height) {
        return this.left === left && this.top === top && this.width === width && this.height === height;
    }
    static ZERO = new Rect(0, 0, 0, 0);
}
export { Rect };
