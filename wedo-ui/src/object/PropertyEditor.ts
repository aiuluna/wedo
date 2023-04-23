import { GroupMeta, Node, Topic } from "@wedo/meta";
import { Emitter } from "@wedo/utils";
import PropItem from "./PropItem";
import Selection from "./Selection";
import { UIModel } from "./UIModel";

export default class PropertyEditor extends Emitter<Topic>{
  groups: Array<GroupMeta>
  props: { [key: string]: PropItem }
  selection: Selection;

  constructor(editor: UIModel) {
    super()
    this.groups = [];
    this.props = {};
    this.selection = editor.selection;

    editor.on(Topic.SelectionChanged).subscribe(() => {
      // 重置为新的node的propEditor
      this.handleSelectionChange(this.selection)
      this.emit(Topic.PropertyModelUpdated)
      this.getProps().forEach(prop => {
        prop.update()
      })
    })

    editor.on([Topic.Resized, Topic.NodeMoved]).subscribe(() => {
      this.getProps().forEach(prop => {
        prop.update()
      })
    })
  }


  getProps() {
    return Object.values(this.props)
  }

  /**
   * 根据node将group和props数据都合并到this.groups和this.props中
   * @param node 
   */
  addNode(node: Node) {
    const meta = node.meta;

    // 合并分组
    for (let group of meta.groups) {
      const sameGroup = this.groups.find(x => x.name === group.name);
      if (sameGroup) {
        sameGroup.mergeGroup(group)
      } else {
        this.groups.push(group.clone())
      }
    }

    // 合并属性清单
    for (let key in meta.props) {
      const prop = meta.props[key];
      if (this.props[key]) {
        this.props[key].merge(prop, node)
      } else {
        this.props[key] = new PropItem(prop, node)
      }
    }
  }

  handleSelectionChange(selection: Selection) {
    this.groups = [];
    this.props = {};
    selection.forEach(node => {
      this.addNode(node)
    })
  }
}