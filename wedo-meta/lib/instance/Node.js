import { fromJS } from 'immutable';
import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { PropMeta } from '../meta/PropMeta';
import { MountPoint } from './MountPoint';
export class Node extends Emitter {
    data;
    meta;
    mountPoint;
    logger;
    level = 0;
    tmpData;
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
    mount(ele, cord) {
        this.mountPoint = new MountPoint(ele, this, cord);
    }
    getMountPoint() {
        return this.mountPoint;
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
    getPassProps() {
        return this.data.get('passProps');
    }
    getStyleObject() {
        return this.data.get('style');
    }
    /**
     * 获取当前node的MountPoint的Rect,没有挂载则返回Rect.ZERO
     * @returns Rect
     */
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
    /**
     * 给当前节点添加绝对定位的node子节点
     * @param node
     * @param position 绝对定位position
     */
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
            children = children.concat(node);
            if (this.isFlex()) {
                children = children.sort((a, b) => a.getRect().left - b.getRect().left);
            }
            return children;
        });
    }
<<<<<<< HEAD
    isFlex() {
        return this.getBox().display === 'flex';
    }
    isContainer() {
        return this.getBox().container;
    }
    isDraggable() {
        const name = this.getName();
        return this.getBox().movable && name !== 'root' && name !== 'page';
    }
=======
>>>>>>> b5aea0ee0dd6f8de5ee09d790eabfd6f7e938511
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
    setPassProps(passObject) {
        this.setInstanceData("passProps", fromJS(passObject));
    }
    /**
     * 获取当前节点的绝对定位的Rect
     * @returns
     */
    absRect() {
        const rect = this.getRect();
        const [x, y] = this.absPosition();
        return new Rect(x, y, rect.left, rect.height);
    }
    /**
     * 获取当前节点的绝对定位坐标
     * @returns [x, y]
     */
    absPosition() {
        // 如果有挂载点，返回挂载节点的绝对定位
        if (this.mountPoint) {
            return this.mountPoint.absPosition();
        }
        const parent = this.getParent();
        const rect = this.getRect();
        // 如果没有父节点，返回当前矩形的x,y
        if (!parent)
            return [rect.left, rect.top];
        // 父节点的x,y坐标加上当前矩形相对父节点的x,y坐标
        const [x, y] = parent.absPosition();
        return [x + rect.left, y + rect.top];
    }
    // 判断坐标是否在当前node节点内
    bound(x, y) {
        if (!this.getParent())
            return true;
        return this.getRect().bound(x, y);
    }
<<<<<<< HEAD
=======
    /**
     * 缓存数据到this.tmpData并触发MemorizedDataChanged事件
     * @param data
     */
    memory(data) {
        this.tmpData = data;
        this.emit(Topic.MemorizedDataChanged);
    }
    isContainer() {
        return this.getBox().container;
    }
    isFlex() {
        return this.getBox().display === 'flex';
    }
    isDraggable() {
        const name = this.getName();
        return this.getBox().movable && name !== 'page' && name !== 'root';
    }
>>>>>>> b5aea0ee0dd6f8de5ee09d790eabfd6f7e938511
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
        const children = this.data.get("children").concat();
        const box = this.getBox();
        if (box.display === 'flex' && box.flexDirection === 'row') {
            children.sort((a, b) => a.absRect().left - b.absRect().left);
        }
        if (box.display === 'flex' && box.flexDirection === 'column') {
            children.sort((a, b) => a.absRect().top - b.absRect().top);
        }
        return children;
    }
    getPassProps() {
        return this.data.get('passProps');
    }
    getStyleObject() {
        return this.data.get('style').toJS();
    }
    getMemorizedData() {
        if (typeof this.tmpData !== 'undefined') {
            return this.tmpData;
        }
        if (this.getParent()) {
            return this.getParent().getMemorizedData();
        }
        return null;
    }
    setXY(vec) {
        this.getBox().left.setValue(vec[0]);
        this.getBox().top.setValue(vec[1]);
    }
    /**
     * 根据偏移量设置xy
     * @param vec [diffX, diffY]
     */
    setXYByVec(vec) {
        const box = this.getBox();
        this.setXY([box.left.toNumber() + vec[0], box.top.toNumber() + vec[1]]);
    }
    setXYWH(left, top, width, height) {
        const box = this.getBox();
        box.left.setValue(left);
        box.top.setValue(top);
        box.width.setValue(width);
        box.height.setValue(height);
    }
    setPassPropValue(key, value) {
        const passProps = this.getPassProps().setIn(key, value);
        this.setInstanceData('passProps', passProps);
    }
    /**
     * 根据mountPoint的rect更新节点的盒子模型
     */
    updateFromMountPoint() {
        const rect = this.getRect();
        const box = this.getBox();
        box.left.setValue(rect.left);
        box.top.setValue(rect.top);
    }
    printData() {
        console.log(this.data.toJS());
    }
}
