import { Emitter } from "./Emitter"
import { Topics } from './Topics'


export default class DragValue extends Emitter<Topics> {
  private startX: number = 0;
  private startY: number = 0;
  private diffX: number = 0;
  private diffY: number = 0;

  public start(e: React.DragEvent) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.diffX = 0;
    this.diffY = 0;
  }

  public update(e: React.DragEvent) {
    this.diffX = e.clientX - this.startX;
    this.diffY = e.clientY - this.startY;
  }

  public getDiffX() {
    return this.diffX
  }

  public getDiffY() {
    return this.diffY
  }
}