import StateMachine from "./StateMachine"
import { Actions, Meta, States } from "./editor.types";
import { Topics } from "./Topics";
import { Node } from "../meta/instance/Node";

export default class Editor extends StateMachine<States, Actions, Topics> {
  private root: Node;
  constructor() {
    super(States.Start)
    this.root = new Node('root', 0, 0, 800, 800)

    // 注册添加组件事件
    this.describeAddComponent()
    // 注册挪动组件事件
    this.describeDrag()
  }

  private describeAddComponent() {
    let componentToPlace: Meta | null = null;
    let addVector: [number, number] = [0, 0];
    this.register(States.Start, States.PlacingComponent, Actions.StartAddComponent, (meta) => {
      componentToPlace = meta;
    })
    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (vec: [number, number]) => {
      addVector = vec;
    })
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, () => {
      if (!componentToPlace) {
        throw Error('no component to create')
      }
      const node = new Node(
        componentToPlace.type,
        addVector[0] - componentToPlace.w / 2 - 100,
        addVector[1] - componentToPlace.h / 2,
        componentToPlace.w,
        componentToPlace.h
      )
      this.root.add(node)
      this.root.emit(Topics.NodeChildrenUpdated)
    })
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log('auto restart')
    })
  }

  private describeDrag() {
    let curNode: Node | null = null;
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, (node) => {
      curNode = node;
    })
    this.register(States.DragStart, States.Stoped, Actions.EvtDragEnd, (vec: [number, number]) => {
      curNode?.setXY(vec)
      curNode?.emit(Topics.NodePositionMoved)
    })
    this.register(States.Stoped, States.Start, Actions.AUTO, () => {
      console.log('auto drag to start')
    })
  }

  public getRoot() {
    return this.root;
  }
}