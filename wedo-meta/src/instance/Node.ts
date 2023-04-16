import { List, Map as ImmutableMap } from 'immutable'
import { Emitter, Rect, Logger } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types'
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';
import { PropMeta } from '../meta/PropMeta';

export class Node extends Emitter<Topic> {

  private mountPoint?: Node | null;
  meta: ComponentMeta; 
  logger: Logger;
  level: number = 0;
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

  constructor(meta: ComponentMeta, private data: NodeData, ) {
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

  public getName() {
    return this.data.get('name')
  }

  public getData(): NodeData {
    return this.data
  }

  public getParent(): Node {
    return this.data.get("parent")
  }

  public getRect(): Rect {
    if(!this.mountPoint) return Rect.ZERO;
    return this.mountPoint.getRect()
  }

  public getBox(): BoxDescriptor {
    return this.data.get('box')
  }

  public addToRelative(node: Node, position?: [number, number]) {
    if (!position) {
      position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
    }
    this.add(node)


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

  public setParent(node: Node | null) {
    this.logger.debug(
      "set-parent",
      this.getType(),
      node?.getType()
    )

    if (node !== null) this.level = node.level + 1;
    this.setInstanceData('parent', node)
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
    return this.data.get('children').toJS()
  }

  public setXY(vec: [number, number]) {
    this.data = this.data
      .set("x", vec[0] + this.data.get("x"))
      .set("y", vec[1] + this.data.get("y"))
  }

  public printData() {
    console.log(this.data.toJS())
  }


  
}