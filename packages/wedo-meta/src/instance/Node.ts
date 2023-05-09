import { List, Map as ImmutableMap, fromJS } from 'immutable'
import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types'
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';
import { PropMeta } from '../meta/PropMeta';
import { MountPoint } from './MountPoint';
import { CordNew } from './Cord.new';

export class Node extends Emitter<Topic> {
  
  meta: ComponentMeta;

  private mountPoint?: MountPoint;
  private logger: Logger;
  private level: number = 0;
  private tmpData: any;
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

  constructor(meta: ComponentMeta, private data: NodeData,) {
    super()
    this.data = data;
    this.meta = meta;
    this.logger = new Logger('node');
    this.getBox().setNode(this)
  }

  public getId(): number {
    return this.data.get('id')
  }

  public setInstanceData(key: string, value: any): void {
    this.data = this.data.set(key, value)
  }

  public updateInstanceData(key: string, updator: (value: any) => any) {
    this.data = this.data.update(key, updator)
  }

  public updateInstanceByPath(path: Array<string>, value: any) {
    this.data = PropMeta.setPropValue(path, this.data, value)
    this.emit(Topic.NodePropUpdated)
  }

  public mount(ele: HTMLElement, cord: CordNew) {
    this.mountPoint = new MountPoint(ele, this, cord)
  }

  public getMountPoint(): MountPoint | undefined {
    return this.mountPoint;
  }


  public addToRelative(node: Node, position?: [number, number]) {
    if (!position) {
      position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
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
  public addToAbsolute(node: Node, position?: [number, number]) {
    if (!position) {
      position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
    }
    this.add(node);
    // 子节点位置 
    const [x, y] = position;
    // 当前节点位置
    const [sx, sy] = this.absPosition();
    // 计算子节点相对于当前节点的位置
    node.setXY([x - sx, y - sy])
    this.sortChildren(node);
  }

  public setAllowDrag(allowDrag: boolean) {
    this.setInstanceData('allowDrag', allowDrag)
  }

  private sortChildren(node: Node) {
    this.updateInstanceData('children', (_children) => {
      let children = _children as Array<Node>;
      children = children.concat(node)
      if (this.isFlex()) {
        children = children.sort((a, b) => a.getRect().left - b.getRect().left)
      }
      return children
    })
  }


  public add(child: Node) {
    // this.data = this.data.update('children', children => children.push(child))
    if (child === this) {
      throw new Error("cannot add node to itself.")
    }

    if (child.getParent() === this) {
      return
    }

    this.logger.debug(
      "add",
      child.getName(),
      "to",
      this.getName(),
    )

    if (child.getParent()) {
      const p = child.getParent();
      p.remove(child)
    }

    child.setParent(this)

  }

  // 删除子节点
  public remove(node: Node) {
    this.updateInstanceData('children', (children: Array<Node>) => {
      return children.filter(child => child !== node)
    })
  }

  public setChildren(children: Array<Node>) {
    this.setInstanceData('children', children)
  }

  public setParent(node: Node | null) {
    this.logger.debug(
      "set-parent",
      this.getType(),
      node?.getType()
    )

    if (node !== null) this.level = node.level + 1;
    this.setInstanceData('parent', node)
  }

  public setPassProps(passObject: any) {
    this.setInstanceData("passProps", fromJS(passObject))
  }

  /**
   * 获取当前节点的绝对定位的Rect
   * @returns 
   */
  public absRect(): Rect {
    const rect = this.getRect();
    const [x, y] = this.absPosition();
    return new Rect(x, y, rect.width, rect.height)
  }

  /**
   * 获取当前节点的绝对定位坐标
   * @returns [x, y]
   */
  public absPosition(): [number, number] {
    // 如果有挂载点，返回挂载节点的绝对定位
    if (this.mountPoint) {
      return this.mountPoint.absPosition()
    }
    const parent = this.getParent()
    const rect = this.getRect()
    // 如果没有父节点，返回当前矩形的x,y
    if (!parent) return [rect.left, rect.top];
    // 父节点的x,y坐标加上当前矩形相对父节点的x,y坐标
    const [x, y] = parent.absPosition();
    return [x + rect.left, y + rect.top]
  }

  // 判断坐标是否在当前node节点内
  public bound(x: number, y: number): boolean {
    if (!this.getParent()) return true;
    return this.getRect().bound(x, y)
  }
  
  /**
   * 缓存数据到this.tmpData并触发MemorizedDataChanged事件
   * @param data 
   */
  public memory(data: any) {
    this.tmpData = data;
    this.emit(Topic.MemorizedDataChanged)
  }

  public isContainer() {
    return this.getBox().container
  }

  public isFlex() {
    return this.getBox().display === 'flex'
  }

  public isDraggable() {
    const name = this.getName();
    return this.getBox().movable && name !== 'root' && name !== 'page'
  }

  public isResizable() {
    const name = this.getName();
    return  this.getBox().resizable && name !== 'root' && name !== 'page'
  }


  public getName() {
    return this.data.get('name')
  }

  public getData(): NodeData {
    return this.data
  }

  public getParent(): Node {
    return this.data.get("parent")
  }


  /**
   * 获取当前node的MountPoint的Rect,没有挂载则返回Rect.ZERO
   * @returns Rect
   */
  public getRect(): Rect {
    if (!this.mountPoint) return Rect.ZERO;
    return this.mountPoint.getRect()
  }

  public getBox(): BoxDescriptor {
    return this.data.get('box')
  }

  public getType() {
    return this.data.get('type')
  }

  public getX() {
    return this.data.get('x')
  }

  public getY() {
    return this.data.get('y')
  }

  public getW() {
    return this.data.get('w')
  }

  public getH() {
    return this.data.get('h')
  }

  public getChildren() {
    const children: Array<Node> = this.data.get("children").concat()
    const box = this.getBox()
    if (box.display === 'flex' && box.flexDirection === 'row') {
      children.sort((a, b) => a.absRect().left - b.absRect().left)
    }
    if (box.display === 'flex' && box.flexDirection === 'column') {
      children.sort((a, b) => a.absRect().top - b.absRect().top)
    }
    return children
  }

  public getPassProps(): ImmutableMap<string, any> {
    return this.data.get('passProps')
  }

  public getStyleObject() {
    return this.data.get('style').toJS()
  }
 
  public getMemorizedData(): any {
    if (typeof this.tmpData !== 'undefined') {
      return this.tmpData
    }
    if (this.getParent()) {
      return this.getParent().getMemorizedData()
    }
    return null
  }

  public setXY(vec: [number, number]) {
    this.getBox().left.setValue(vec[0])
    this.getBox().top.setValue(vec[1])
  }

  /**
   * 根据偏移量设置xy
   * @param vec [diffX, diffY]
   */
  public setXYByVec(vec: [number, number]) {
    const box = this.getBox();
    this.setXY([box.left.toNumber() + vec[0], box.top.toNumber() + vec[1]])
  }

  public setXYWH(left: number, top: number, width: number, height: number) {
    const box = this.getBox();
    box.left.setValue(left);
    box.top.setValue(top);
    box.width.setValue(width);
    box.height.setValue(height);
  }

  public setPassPropValue(key: Array<string>, value: any) {
    const passProps = this.getPassProps().setIn(key, value);
    this.setInstanceData('passProps', passProps);
  }

  /**
   * 根据mountPoint的rect更新节点的盒子模型
   */
  public updateFromMountPoint() {
    const rect = this.getRect();
    const box = this.getBox();
    box.left.setValue(rect.left);
    box.top.setValue(rect.top);
  }

  public printData() {
    console.log(this.data.toJS())
  }

  *bfs(): Generator<Node> {
    yield this;
    for (let child of this.getChildren()) {
      yield* child.bfs()
    }
  }
}