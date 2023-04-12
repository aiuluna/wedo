import { Emitter, Rect } from "@wedo/utils";
export class Node extends Emitter {
    data;
    mountPoint;
    meta;
    // constructor(type: string, x: number, y: number, w: number, h: number) {
    //   super()
    //   this.data = ImmutableMap({
    //     type,
    //     x,
    //     y,
    //     w,
    //     h,
    //     children: List<Node>()
    //   })
    // }
    constructor(data, meta) {
        super();
        this.data = data;
        this.data = data;
        this.meta = meta;
        this.getBox().setNode(this);
    }
    setInstanceData(key, value) {
        this.data = this.data.set(key, value);
    }
    updateInstanceData(key, updator) {
        this.data = this.data.update(key, updator);
    }
    getData() {
        return this.data;
    }
    getParent() {
        return this.data.get("parent");
    }
    getRect() {
        if (!this.mountPoint)
            return Rect.ZERO;
        return this.mountPoint.getRect();
    }
    getBox() {
        return this.data.get('box');
    }
    add(child) {
        this.data = this.data.update('children', children => children.push(child));
    }
    getType() {
        return this.data.get('type');
    }
    getX() {
        return this.data.get('x');
    }
    getY() {
        return this.data.get('y');
    }
    getW() {
        return this.data.get('w');
    }
    getH() {
        return this.data.get('h');
    }
    getChildren() {
        return this.data.get('children').toJS();
    }
    setXY(vec) {
        this.data = this.data
            .set("x", vec[0] + this.data.get("x"))
            .set("y", vec[1] + this.data.get("y"));
    }
    printData() {
        console.log(this.data.toJS());
    }
}
