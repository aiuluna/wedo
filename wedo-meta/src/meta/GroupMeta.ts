import { PropConfig } from "./PropMeta";

export interface GroupConfig {
  name: string;
  title: string;
  disabled?: boolean;
  style: any;
  props?: Array<PropConfig>;
}

export class GroupMeta {
  name: string;
  title: string;
  disabled?: boolean;
  style: any;
  propKeys: Set<string>; // 用来筛选当前group的name归属

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
    group.disabled = config.disabled || false;
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
    g.disabled = this.disabled;
    g.propKeys = new Set([...this.propKeys]);
    return g;
  }

  mergeGroup(group: GroupMeta) {
    // const g = new GroupMeta()
    // g.propKeys = new Set([...this.propKeys])
    // for (let prop of group.propKeys) {
    //   g.propKeys.add(prop)
    // }
    // return g
    for (let prop of group.propKeys) {
      this.propKeys.add(prop)
    }
  }
}