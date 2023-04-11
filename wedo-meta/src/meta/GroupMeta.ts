import { PropConfig } from "./PropMeta";

export interface GroupConfig {
  name: string;
  title: string;
  disable?: boolean;
  style: any;
  props?: Array<PropConfig>;
}

export class GroupMeta {
  name: string;
  title: string;
  disable?: boolean;
  style: any;
  // todo ???为什么只要key
  propKeys: Set<string>;

  private constructor() {
    this.name = '';
    this.title = '';
    this.style = '';
    this.propKeys = new Set<string>();
  }

  static of(config: GroupConfig) {
    const group = new GroupMeta();
    group.name = config.name;
    group.title = config.title;
    group.disable = config.disable || false;
    group.style = config.style;
    if (config.props) {
      config.props.forEach(prop => {
        if (prop.name) {
          group.propKeys.add(prop.name);
        }
      })
    }
    return group;
  }

  clone() {
    const g = new GroupMeta();
    g.name = this.name;
    g.title = this.title;
    g.style = this.style;
    g.disable = this.disable;
    g.propKeys = new Set([...this.propKeys]);
    return g;
  }

  mergeGroup(group: GroupMeta) {
    
  }
}