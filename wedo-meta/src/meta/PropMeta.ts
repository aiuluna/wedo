import { NodeData } from "../standard.types";

export interface PropConfig {
  name: string;
  label?: string;
  props?: any;
  disable?: boolean;
  type: string;
  path: string;
  default?: any;
  row?: number;
  rowLabel?: string;
  selections?: any;
  children?: Array<PropConfig>
}

export class PropMeta {
  disable?: boolean;
  path: Array<string>;
  config: PropConfig; 
  constructor(config: PropConfig) {
    this.config = config;
    this.path = config.path.split('.');
  }

  static setPropValue(path: Array<string>, data: NodeData, value: any) {
    // box放到data的box属性里
    if (path[0] === 'rect') {
      const rect = data.get('rect').clone();
      rect[path[1]] = value;
      return data.set('rect', rect);
    }
    if (path[0] === 'box') {
      // ['box','left']
      const box = data.get('box').clone()
      box[path[1]] = value
      return data
    }
    return data.setIn(path, value)
  }

  static getPropValue(path: Array<string>, data: NodeData) {
    if (path[0] === 'rect') {
      return data.get('rect')[path[1]]
    } 
    if (path[0] === 'box') {
      return data.get('rect')[path[1]]
    }
    return data.getIn(path)
  }

}