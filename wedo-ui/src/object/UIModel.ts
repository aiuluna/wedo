import { ComponentMeta, JsonPage, Node, Page, Topic } from "@wedo/meta";
import PropertyEditor from "./PropertyEditor";
import Selection from "./Selection";
import StateMachine from "./StateMachine";
import { UIEvents, UIStates } from "./uiModel.types";
import { ComponentsLoader } from "@wedo/loader/lib";
import md5 from 'md5'
import { NodeSelector } from "./NodeSelector";
import { Rect, throttle } from "@wedo/utils";
import { getFlexGap } from "../util/getFlexGap";

export class UIModel extends StateMachine<UIStates, UIEvents, Topic> {
  // todo 基准线
  // assistLine
  ctrlDown: boolean;
  altDown: boolean;
  mouseDown: boolean;
  root: Node;
  startSelVer: number;
  selection: Selection;
  contentHash: string;
  propertyEditor: PropertyEditor;
  page: Page;
  dropComponentMeta: ComponentMeta | null = null;
  dropComponentPosition: [number, number] = [0, 0];
  dropNode?: Node | null;
  copyList: Array<Node> = [];

  constructor(json: JsonPage, pageName: string) {
    super(UIStates.Start)
    this.selection = new Selection()
    this.page = new Page(pageName, json, ComponentsLoader.getInstance())
    this.root = this.page.getRoot()
    this.propertyEditor = new PropertyEditor(this)
    this.ctrlDown = false;
    this.altDown = false;
    this.mouseDown = false;
    this.startSelVer = 0;
    this.contentHash = md5(JSON.stringify(json))

    // @ts-ignore
    // 调试用
    window["ui"] = this

    this.describe('拖拽新元素的逻辑', (register) => {
      // 开始拖拽
      register([UIStates.Start, UIStates.Selected], UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
        this.dropComponentMeta = meta
      })

      // 拖拽中
      register([UIStates.StartAdd, UIStates.Adding], UIStates.Adding, UIEvents.EvtAddDraging, (position: [number, number]) => {
        this.dropComponentPosition = position;
        const receiver = NodeSelector.selectForDrop(this.root, position, null);
        this.emit(Topic.ShadowReceiverChanged, receiver)
      })

      // 拖拽添加完成
      register([UIStates.StartAdd, UIStates.Adding], UIStates.Added, UIEvents.EvtDrop, () => {
        // 当前鼠标拖拽的位置,即node的中心位置
        const position = this.dropComponentPosition;
        // 创建当前位置的拖拽节点副本
        const node = this.page.createFromMetaNew(this.dropComponentMeta!, position);
        // 选择当前位置最适合的接收容器
        const receiver = NodeSelector.selectForDrop(this.root, position, null)
        // 接收容器的矩形区域
        const rect = receiver!.getRect();
        // 获取当前节点的相对接收容器的rect的宽高
        const width = node.getBox().width.toPxNumberWithRect(rect);
        const height = node.getBox().height.toPxNumberWithRect(rect);
        // 将node通过绝对定位添加到container中
        receiver?.addToAbsolute(node, [
          position[0] - width / 2,
          position[1] - height / 2
        ])
        receiver?.emit(Topic.NewNodeAdded);
        // 初始化拖拽元数据
        this.dropComponentMeta = null;
        // 将选中节点变为当前节点，右侧属性会变为选中节点的属性
        this.selection.replace(node);
        // todo linknode
        // if(receiver instanceof LinkedNode) {
        //   for(let refNode of receiver.node.getRefs()) {
        //     refNode.emit(Topic.NodeChildrenChanged)
        //   }
        // }

        this.emit(Topic.SelectionChanged)
      })

      // 注册状态机，自动从已添加状态变为已选中状态
      register(UIStates.Added, UIStates.Selected, UIEvents.AUTO, () => { })

    })

    this.describe('处理选中的逻辑', (register) => {
      register([UIStates.Start, UIStates.Selected], UIStates.Selected, UIEvents.EvtSelected, (node: Node) => {
        this.selection.replace(node)
        this.emit(Topic.SelectionChanged)
      })
      register([UIStates.Selected], UIStates.Start, UIEvents.EvtCancelSelect, () => {
        // this.selection.clear()
        // this.emit(Topic.SelectionChanged)
      })
    })

    this.describe('处理拖拽的逻辑', register => {
      // 最后一个接收容器
      let lastReceiver : Node | null

      function selectForDrop(container: Node, rect: Rect, exclude: Node | null) {
        // 获取适合放置rect的最适合的容器
        let receiver = NodeSelector.selectForDrop(container, [rect[0], rect[1]], exclude);
        // 判断容器存在并且容器没有全包含rect
        if (receiver && !receiver.absRect().contains(rect)) {
          // 如果父节点是flex布局，接受容器就变为父节点
          const parent = receiver.getParent();
          if (parent && parent.isFlex()) {
            receiver = parent;
          }
        }
        return receiver;
      }

      const handlerSyncMoving = (node: Node, vec: [number, number]) => {
        return throttle((node: Node, vec: [number, number]) => {
          // 获取当前节点的绝对定位的rect
          const absRect = node.absRect();
          // 获取当前位置适合放置的container，不包括node本身
          const receiver = selectForDrop(this.root, absRect, node);
          // 判断如果接收节点是flex，就要放到容器里并且通知重新排序receiver的children
          if (receiver && receiver.isFlex()) {
            const flexGapIdx = getFlexGap(receiver.getChildren(), node, receiver.getBox().flexDirection === 'row' ? 'row' : 'column')
            receiver.emit(Topic.NodeGapIndexChanged, flexGapIdx)
          }
          // 最新的接收容器不再接收该组件，通知lastReceiver不需要重新排序
          if (receiver !== lastReceiver) {
            lastReceiver && lastReceiver.emit(Topic.NodeGapIndexChanged, null);
            lastReceiver = receiver;          
          }

          // todo 对齐线


        }, 100)
      }

      register(UIStates.Selected, UIStates.Moving, UIEvents.EvtMoving, (node: Node, vec: [number, number]) => {

      })

      register(UIStates.Moving, UIStates.Moving, UIEvents.EvtMoving, (node: Node, vec: [number, number]) => {
        handlerSyncMoving(node, vec)
      })
    })

  }
}