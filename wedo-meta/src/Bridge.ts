import { Node } from "./instance/Node";
import { Page } from "./instance/Page";
import { RenderFor, RenderOptions } from "./standard.types";
import { Topic } from "./Topic";

type BridgeMode = 'editor' | 'render';

export class Bridge {
  private node?: Node;
  private page?: Page;
  private mode: BridgeMode;
  private dataChangeHandlers: Function[] = [];

  renderForReact?: (node: Node, options: RenderOptions) => any;

  constructor(node?: Node, page?: Page, mode: BridgeMode = 'editor') {
    this.mode = mode;
    this.node = node;
    this.page = page;
    node?.on(Topic.MemorizedDataChanged).subscribe(() => {
      this.dataChangeHandlers.forEach(h => h())
    })
  }

  getNode() {
    if (!this.node) {
      throw Error("member node not exists on bridge, maybe this is a mocked bridge.")
    }
    return this.node!
  }

  getPage() {
    if (!this.page) {
      throw Error("member page not exists on bridge, maybe this is a mocked bridge.")
    }
    return this.page!
  }

  getPassProps() {
    return this.getNode().getPassProps().toJS()
  }

  getMode() {
    return this.mode
  }

  setPropValue(key: Array<string>, value: any) {
    this.getNode().setPassPropValue(key, value);
    this.getNode().emit(Topic.NodePropUpdated)
  }

  render(type: RenderFor, node: Node, options: RenderOptions) {
    switch (type) {
      case 'dom':
        return null
      case 'react':
        return this.renderForReact!(node, options)
    }
  }


  addNode(node: Node) {
    this.getNode().addToRelative(node)
    return node;
  }

  getMemorizedData() {
    return this.getNode().getMemorizedData()
  }

  onDataChange(handler: Function) {
    this.dataChangeHandlers.push(handler)
  }

}