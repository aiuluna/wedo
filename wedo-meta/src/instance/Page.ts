import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { ComponentMeta } from "../meta/ComponentMeta";
import { BoxDescriptor } from "../BoxDescriptor";
import { Node } from "./Node";
import { NodeType } from '../standard.types'

type ComponentsLoader = {
  loadByName: (group: string, name: string) => ComponentMeta
}

export class Page extends Emitter<Topic>{
  private root: NodeType;
  private name: string;
  private loader: ComponentsLoader;
  private id_base = 1;

  constructor(name: string, loader: ComponentsLoader) {
    super()
    this.name = name;
    this.loader = loader;
1
    const meta = this.loader.loadByName("container", "root")
    const box = new BoxDescriptor({
      left: 0,
      top: 0,
      width: 3200,
      height: 3200
    }, meta)
    this.root = new Node(meta, meta.createData(this.createId(), box))

  }

  createId() {
    return this.id_base++
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