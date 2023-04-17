import { ComponentMeta, JsonPage, Node, Page, Topic } from "@wedo/meta";
import PropertyEditor from "./PropertyEditor";
import Selection from "./Selection";
import StateMachine from "./StateMachine";
import { UIEvents, UIStates } from "./uiModel.types";
import { ComponentsLoader } from "@wedo/loader/lib";
import md5 from 'md5'
import { NodeSelector } from "./NodeSelector";

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
            const position = this.dropComponentPosition;
            const node = this.page.createFromMetaNew(this.dropComponentMeta!, position);
            const receiver = NodeSelector.selectForDrop(this.root, position, null)

            const rect = receiver!.getRect();
            
        })

    })

  }
}