import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { ComponentMeta } from "../meta/ComponentMeta";
import { BoxDescriptor } from "../BoxDescriptor";
import { Node } from "./Node";
import { JsonNode, JsonPage, NodeType } from '../standard.types'

type ComponentsLoader = {
  loadByName: (group: string, name: string) => Promise<ComponentMeta>
}

export class Page extends Emitter<Topic>{
  private root: NodeType;
  private name: string;
  private loader: ComponentsLoader;
  private id_base;
  private nodes: Array<Node>;
  private links: Record<number, Node>;
  private pageNode: NodeType;

  constructor(name: string, json: JsonPage, loader: ComponentsLoader) {
    super()
    this.name = name;
    this.loader = loader;
    this.id_base = 1;
    this.nodes = [];

    const meta = this.loader.loadByName("container", "root")
    const box = new BoxDescriptor({
      left: 0,
      top: 0,
      width: 3200,
      height: 3200
    }, meta)
    this.root = new Node(meta, meta.createData(this.createId(), box))
    this.linkPage(this.root)

    this.links = {};


  }

  createId() {
    return this.id_base++
  }

  private linkPage(node: Node) {
    this.nodes[node.getId()] = node;
  }

  private async fromJson(json: JsonNode): Promise<Node> {
    const meta = await this.loader.loadByName(json.group, json.name);
    const box = new BoxDescriptor(json.box, meta);

    if (json.id) {
      // 为了让id_base永远不和json.id相同
      this.id_base = Math.max(this.id_base, json.id + 1)
    }
    const id = json.id || this.createId();

    let node : Node
    if (json.id) {
      // todo LinkNode
      const instanceData = meta.createDataFromJson(json);
      node = new Node(meta, instanceData)
    } else {
      const instanceData = meta.createData(id, box)
      node = new Node(meta, instanceData)
    }





  }


  // async createRoot() {
  //   const meta = await this.loader.loadByName('container', 'root');
  //   const box = new BoxDescriptor({
  //     left: 0,
  //     top: 0,
  //     width: 3200,
  //     height: 3200
  //   }, meta)
  //   const nodeData = meta.createData(1, box)
  //   const root = new Node(meta, nodeData);
  //   console.log("🚀 ~ file: UIEditor.tsx:52 ~ createRoot ~ root:", root)
  // }
}