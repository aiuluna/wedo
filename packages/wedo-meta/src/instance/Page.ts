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
  private root!: NodeType;
  name: string;
  private loader: ComponentsLoader;
  private id_base;
  private nodes: Array<Node>;
  private links: Record<number, Node>;
  pageNode!: NodeType;

  constructor(name: string, json: JsonPage, loader: ComponentsLoader) {
    super()
    this.name = name;
    this.loader = loader;
    this.id_base = 1;
    this.nodes = [];
    this.links = {};

    this.init(json);
  }

  createId() {
    return this.id_base++
  }

  private async init(json: JsonPage) {   
    await this.initRoot() 
    const pageNode = await this.fromJson(json.page);
    pageNode.setAllowDrag(false);
    this.root.addToAbsolute(pageNode)
    this.pageNode = pageNode

      // @ts-ignore
    // 调试用
    window["root"] = this.root

    // @ts-ignore
    window['page'] = this
  }

  private async initRoot() {
    const meta = await this.loader.loadByName("container", "root")
    const box = new BoxDescriptor({
      left: 0,
      top: 0,
      width: 3200,
      height: 3200
    }, meta)
    this.root = new Node(meta, meta.createData(this.createId(), box))
    this.linkPage(this.root)
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

    let node: Node
    if (json.id) {
      // todo LinkNode
      const instanceData = meta.createDataFromJson(json);
      node = new Node(meta, instanceData)
    } else {
      const instanceData = meta.createData(id, box)
      node = new Node(meta, instanceData)
    }
    this.linkPage(node);
    if (!json.id) {
      json.children && json.children.forEach(async child => {
        node.addToRelative(await this.fromJson(child))
      });
    } else {
      if (json.children && !json.linkedId) {
        const nodes: Array<Node> = [];
        json.children.forEach(async child => {
          const childNode = await this.fromJson(child);
          childNode.setParent(node);
          nodes.push(childNode);
        })
        node.setChildren(nodes)
      }
    }

    return node;
  }

  public getNodeById(id: number) {
    return this.nodes[id]
  }

  public async createFromJSON(json: JsonNode): Promise<Node> {
    return await this.fromJson(json)
  }

  public createFromMetaNew(meta: ComponentMeta, position: [number, number]): Node {
    const box = meta.box.clone()
    box.left.setValue(position[0])
    box.top.setValue(position[1])
    const id = this.createId()
    const nodeData = meta.createData(id, box)
    const node = new Node(meta, nodeData);
    this.linkPage(node);
    return node;
  }

  public getRoot(): Node {
    return this.root;
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