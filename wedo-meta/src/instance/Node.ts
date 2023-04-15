import { List, Map as ImmutableMap } from 'immutable'
import { Emitter, Rect } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types'
import { ComponentMeta } from '../meta/ComponentMeta';
import { BoxDescriptor } from '../BoxDescriptor';

export class Node extends Emitter<Topic> {

  private mountPoint?: Node | null;
  meta: ComponentMeta; 
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
    this.getBox().setNode(this)
  }

  public setInstanceData(key: string, value: any): void {
    this.data = this.data.set(key, value)
  }

  public updateInstanceData(key: string, updator: (value: any) => any) {
    this.data = this.data.update(key, updator) 
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



  public add(child: Node) {
    this.data = this.data.update('children', children => children.push(child))
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