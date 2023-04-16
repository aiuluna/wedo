import { Node, PropMeta, Topic } from "@wedo/meta";
import { Emitter } from "@wedo/utils";

export default class PropItem extends Emitter<Topic>{
  meta: PropMeta;
  // Node可以嵌套，所以会有多个node属性的合并
  nodes: Array<Node>;
  disable: boolean;
  value: any;

  constructor(meta: PropMeta, node: Node) {
    super();
    this.meta = meta;
    this.nodes = [];
    this.nodes.push(node);
    this.disable = meta.disable || false;
    this.value = PropMeta.getPropValue(meta.path, node.getData())
  }

  /**
   * 合并node，如果两个属性值相同就可以编辑，否则不可编辑
   * @param meta 
   * @param node 
   */
  merge(meta: PropMeta, node: Node) {
    const value = PropMeta.getPropValue(meta.path, node.getData());
    if (value !== this.value) {
      this.disable = true
    }
    this.nodes.push(node)
  }

  update() {
    if (this.disable) return;
    if (this.nodes.length > 0) {
      this.value = PropMeta.getPropValue(this.meta.path, this.nodes[0].getData())      
    }
    if (this.value && this.value.toJS) {
      this.value = this.value.toJS()
    }
    this.emit(Topic.PropertyChanged)
  }

  set(value: any) {
    this.nodes.forEach(node => {
      node.updateInstanceByPath(this.meta.path, value)
    })
    this.emit(Topic.PropertyChanged)
  }
}