import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { PropMeta } from '../meta/PropMeta';
export class Node extends Emitter {
    data;
    mountPoint;
    meta;
    logger;
    level = 0;
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
    constructor(meta, data) {
        super();
        this.data = data;
        this.data = data;
        this.meta = meta;
        this.logger = new Logger('node');
        this.getBox().setNode(this);
    }
    getId() {
        return this.data.get('id');
    }
    setInstanceData(key, value) {
        this.data = this.data.set(key, value);
    }
    updateInstanceData(key, updator) {
        this.data = this.data.update(key, updator);
    }
    updateInstanceByPath(path, value) {
        this.data = PropMeta.setPropValue(path, this.data, value);
        this.emit(Topic.NodePropUpdated);
    }
    getName() {
        return this.data.get('name');
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
    addToRelative(node, position) {
        if (!position) {
            position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()];
        }
        this.add(node);
        node.setXY(position);
        this.sortChildren(node);
    }
    addToAbsolute(node, position) {
        if (!position) {
            position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()];
        }
        this.add(node);
        // 子节点位置 
        const [x, y] = position;
        // 当前节点位置
        const [sx, sy] = this.absPosition();
        // 计算子节点相对于当前节点的位置
        node.setXY([x - sx, y - sy]);
        this.sortChildren(node);
    }
    setAllowDrag(allowDrag) {
        this.setInstanceData('allowDrag', allowDrag);
    }
    sortChildren(node) {
        this.updateInstanceData('children', (_children) => {
            let children = _children;
            children.concat(node);
            if (this.isFlex()) {
                children = children.sort((a, b) => a.getRect().left - b.getRect().left);
            }
            return children;
        });
    }
    isFlex() {
        return this.getBox().display === 'flex';
    }
    add(child) {
        // this.data = this.data.update('children', children => children.push(child))
        if (child === this) {
            throw new Error("cannot add node to itself.");
        }
        if (child.getParent() === this) {
            return;
        }
        this.logger.debug("add", child.getName(), "to", this.getName());
        if (child.getParent()) {
            const p = child.getParent();
            p.remove(child);
        }
        child.setParent(this);
    }
    // 删除子节点
    remove(node) {
        this.updateInstanceData('children', (children) => {
            return children.filter(child => child !== node);
        });
    }
    setChildren(children) {
        this.setInstanceData('children', children);
    }
    setParent(node) {
        this.logger.debug("set-parent", this.getType(), node?.getType());
        if (node !== null)
            this.level = node.level + 1;
        this.setInstanceData('parent', node);
    }
    absPosition() {
        if (this.mountPoint) {
            return this.mountPoint.absPosition();
        }
        const parent = this.getParent();
        const rect = this.getRect();
        if (!parent)
            return [rect.left, rect.top];
        const [x, y] = parent.absPosition();
        return [x + rect.left, y + rect.top];
    }
    // 判断坐标是否在当前node节点内
    bound(x, y) {
        if (!this.getParent())
            return true;
        return this.getRect().bound(x, y);
    }
    isContainer() {
        return this.getBox().container;
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
        this.getBox().left.setValue(vec[0]);
        this.getBox().top.setValue(vec[1]);
    }
    printData() {
        console.log(this.data.toJS());
    }
}
