import { ComponentMeta, JsonPage, Node, Page, Topic } from "@wedo/meta";
import PropertyEditor from "./PropertyEditor";
import Selection from "./Selection";
import StateMachine from "./StateMachine";
import { UIEvents, UIStates } from "./uimodel.types";

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
  dropComponentMeta: ComponentMeta | null;
  dropComponentPosition: [number, number] = [0, 0];
  dropNode?: Node | null;
  copyList: Array<Node> = [];

  constructor(json : JsonPage, pageName : string) {
    super(UIStates.Start)
    
  }
}