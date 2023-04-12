import { NodeData } from "@wedo/meta/lib/standard.types";
import StateMachine from "./StateMachine"
import { Actions, Meta, States } from "./editor.types";
import { Topic, Node, ComponentMeta } from "@wedo/meta";
import { Map as ImmutableMap } from "immutable";

export default class Editor extends StateMachine<States, Actions, Topic> {
  private root: Node;
  constructor() {
    super(States.Start)
    // this.root = new Node('root', 0, 0, 800, 800)
    // this.root = new Node(ImmutableMap({
    //       type: 'root',
    //       x: 0,
    //       y: 0,
    //       w: 800,
    //       h: 800,
    //     }) as NodeData, )

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
      this.root.emit(Topic.NodeChildrenUpdated)
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
      curNode?.emit(Topic.NodePositionMoved)
    })
    this.register(States.Stoped, States.Start, Actions.AUTO, () => {
      console.log('auto drag to start')
    })
  }

  public getRoot() {
    return this.root;
  }
}