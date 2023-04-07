import { List, Map as ImmutableMap } from 'immutable'
import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { NodeData } from '../standard.types'

export class Node extends Emitter<Topic> {

  constructor(private data: NodeData) {
    super()
    this.data = data;
  }

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