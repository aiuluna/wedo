import { ComponentMeta, JsonPage, Node, Page, Topic } from "@wedo/meta";
import PropertyEditor from "./PropertyEditor";
import Selection from "./Selection";
import StateMachine from "./StateMachine";
import { CubeType, UIEvents, UIStates } from "./uiModel.types";
import { ComponentsLoader } from "@wedo/loader/lib";
import md5 from 'md5'
import { NodeSelector } from "./NodeSelector";
import { Rect, throttle } from "@wedo/utils";
import { getFlexGap } from "../util/getFlexGap";
import Resizer from "./Resizer";

export class UIModel extends StateMachine<UIStates, UIEvents, Topic> {
  // todo 基准线
  // assistLine
  ctrlDown: boolean;
  altDown: boolean;
  mouseDown: boolean;
  root: Node | undefined;
  startSelVer: number;
  selection: Selection;
  contentHash: string;
  propertyEditor: PropertyEditor;
  page: Page;
  dropComponentMeta: ComponentMeta | null = null;
  dropComponentPosition: [number, number] = [0, 0];
  dropNode?: Node | null;
  copyList: Array<Node> = [];

  static instance: Page | null = null;

  private constructor(json: JsonPage, pageName: string) {
    super(UIStates.Start)
    this.selection = new Selection()
    this.page = new Page(pageName, json, ComponentsLoader.getInstance())
    this.propertyEditor = new PropertyEditor(this)
    this.ctrlDown = false;
    this.altDown = false;
    this.mouseDown = false;
    this.startSelVer = 0;
    this.contentHash = md5(JSON.stringify(json))

    // @ts-ignore
    // 调试用
    window["ui"] = this
    // For debug 
    // @ts-ignore
    window.editor = this
  }

  static async getInstance(json: JsonPage, pageName: string) {
    // if (UIModel.instance) return UIModel.instance;
    const _instance = new UIModel(json, pageName);
    await Promise.resolve().then(() => {
      // 让前面的微队列先执行完就能拿到root
      _instance.root = _instance.page.getRoot();
      _instance.registerAll()
    })
    return _instance;
  }

  private registerAll() {
    this.describe('拖拽新元素的逻辑', (register) => {
      // 开始拖拽
      register([UIStates.Start, UIStates.Selected], UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
        this.dropComponentMeta = meta
      })
      // 拖拽中
      register([UIStates.StartAdd, UIStates.Adding], UIStates.Adding, UIEvents.EvtAddDraging, (position: [number, number]) => {
        this.dropComponentPosition = position;
        const receiver = NodeSelector.selectForDrop(this.root!, position, null);
        this.emit(Topic.ShadowReceiverChanged, receiver)
      })

      // 拖拽添加完成
      register([UIStates.StartAdd, UIStates.Adding], UIStates.Added, UIEvents.EvtDrop, () => {
        // 当前鼠标拖拽的位置,即node的中心位置
        const position = this.dropComponentPosition;
        // 创建当前位置的拖拽节点副本
        const node = this.page.createFromMetaNew(this.dropComponentMeta!, position);
        // 选择当前位置最适合的接收容器
        const receiver = NodeSelector.selectForDrop(this.root!, position, null)
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
      // 将当前节点选中，放到editor.selection中
      register([UIStates.Start, UIStates.Selected], UIStates.Selected, UIEvents.EvtSelected, (node: Node) => {
        this.selection.replace(node)
        this.emit(Topic.SelectionChanged)
      })
      // 取消选中
      register([UIStates.Selected], UIStates.Start, UIEvents.EvtCancelSelect, () => {
        // this.selection.clear()
        // this.emit(Topic.SelectionChanged)
      })
    })

    this.describe('处理拖拽的逻辑', register => {
      // 最后一个接收容器
      let lastReceiver: Node | null

      /**
       * 
       * @param container 容器节点，表示在该节点下寻找放置的位置
       * @param rect 相对位置rect
       * @param exclude 排除的节点
       * @returns 
       */
      function selectForDrop(container: Node, rect: Rect, exclude: Node | null) {
        // 获取适合放置rect的最适合的容器
        let receiver = NodeSelector.selectForDrop(container, [rect[0], rect[1]], exclude);
        console.log("🚀 ~ file: UIModel.ts:140 ~ UIModel ~ selectForDrop ~ receiver:", receiver)
        
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
          const receiver = selectForDrop(this.root!, absRect, node);
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

      register(UIStates.Selected, UIStates.Moving, UIEvents.EvtNodeSyncMoving, (node: Node, vec: [number, number]) => {
        console.log('select -> moving')
      })

      register(UIStates.Moving, UIStates.Moving, UIEvents.EvtNodeSyncMoving, (node: Node, vec: [number, number]) => {
        handlerSyncMoving(node, vec)
      })

      register([UIStates.Start, UIStates.Selected, UIStates.Moving], UIStates.Moved, UIEvents.EvtNodeMoved,
        (node: Node, vec: [number, number]) => {
          // vec是偏移量，即diffX,diffY
          node.setXYByVec(vec);
          node.emit(Topic.NodeMoved)
          this.emit(Topic.NodeMoved)
        })

      // 从已完成移动到被选中的自动状态机
      register(UIStates.Moved, UIStates.Selected, UIEvents.AUTO, () => {
        if (lastReceiver) {
          lastReceiver.emit(Topic.NodeGapIndexChanged, null)
          lastReceiver = null;
        }
        // 从所有选中节点遍历，调整原先父节点为当前接收节点，并调整DOM结构
        this.selection.forEach(node => {
          const parent = node.getParent()
          const absPosition = node.absPosition()
          const rect = node.getRect();
          const receiver = selectForDrop(this.root!, rect, node);
          // 如果接收节点不是父节点，则将接收节点作为父节点，并通知原父节点子节点已经更新
          if (receiver !== parent) {
            receiver?.addToAbsolute(node, absPosition);
            receiver?.emit(Topic.NodeChildrenUpdated)
            parent.emit(Topic.NodeChildrenUpdated)
          }
          // 如果receiver是flex结构，需要同步子节点的box属性
          if (receiver?.isFlex()) {
            receiver.getChildren().forEach((child: Node) => {
              child.updateFromMountPoint()
              child.emit(Topic.NodePositionMoved)
            })
          }

          // todo 收起对齐线
        })
      })
    })

    this.describe('调整大小的交互逻辑', register => {
      let resizeNode: Node | null = null;
      let startRect: Rect | null = null;
      let resizer: Resizer | null = null;
      // 拖动点的vec
      let vecStart: [number, number] = [0, 0];

      register([UIStates.Start, UIStates.Selected], UIStates.StartResize, UIEvents.EvtStartResize, (cubeType: CubeType, clientVec: [number, number], node: Node) => {
        resizeNode = node;
        vecStart = clientVec;
        resizer = new Resizer(cubeType);
        startRect = node.absRect();
      })

      register([UIStates.StartResize, UIStates.Resizing], UIStates.Resizing, UIEvents.EvtMoving, (vecClient: [number, number]) => {
        const difVec: [number, number] = [vecClient[0] - vecStart[0], vecClient[1] - vecStart[1]];

        if (resizeNode) {
          // node的新的绝对定位rect
          const nextRect = resizer!.nextRect(startRect!, difVec)
          const parentRect = resizeNode.getParent().absRect()

          // 设置node新的box，left和top是相对父节点的
          resizeNode?.setXYWH(
            nextRect.left - parentRect.left,
            nextRect.top - parentRect.top,
            nextRect.width,
            nextRect.height
          )

          resizeNode.emit(Topic.Resized)
        }
      })

      register([UIStates.StartResize, UIStates.Resizing], UIStates.Resized, UIEvents.EvtDrop, () => {
        resizeNode = null;
      })

      register(UIStates.Resized, UIStates.Start, UIEvents.AUTO, () => {
        this.emit(Topic.Resized)
      })
    })
  }

  public getStateDesc() {
    return UIStates[this.getState()]
  }

  public getSelection() {
    return this.selection
  }

  public clearSelection() {
    this.selection.clear()
  }

  handleHotKeys(handlers: Array<string>) {

  }
}