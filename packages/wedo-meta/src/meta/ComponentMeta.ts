import { BoxDescriptor } from "../BoxDescriptor";
import { BoxDescriptorInput, JsonNode } from "../standard.types";
import { GroupConfig, GroupMeta } from "./GroupMeta";
import { KeyValueCache } from "./KeyValueCache";
import { PropMeta } from "./PropMeta";
import { Map as ImmutableMap, fromJS } from 'immutable'

export interface PropsEditorConfigure {
  groups: Array<GroupConfig>;
}

export interface ComponentMetaConfig {
  // 组件名称
  name: string;
  // 组件分组
  group: string;
  // logo
  image: string;
  // 标题
  title: string;
  // 盒子模型
  box: BoxDescriptorInput;
  // 属性编辑器属性 
  editor: PropsEditorConfigure;
  // 描述
  description: string;
  // 是否为内部属性
  intrinsic?: boolean;
  // 初始样式
  style?: any;

  author: string;

  // 初始属性
  defaultProps: any;

  /* External components' */
  componentType: 'vue' | 'react';
  // source file location
  src: string;
  // js file location
  file: string;
  url?: string;
  yml: string;
  imageUrl: string;
  version: string;

}

export class ComponentMeta {
  name: string;
  group: string;
  image: string;
  title: string;
  box: BoxDescriptor;
  editor: PropsEditorConfigure;
  intrinsic?: boolean;
  url?: string;
  style?: any;
  defaultProps: any;
  imageUrl: string;
  componentType: 'vue' | 'react';
  props:
    { [key: string]: PropMeta } = {};
  groups: Array<GroupMeta>;
  cache: KeyValueCache<any>;

  constructor(config: ComponentMetaConfig) {
    this.name = config.name;
    this.group = config.group;
    this.image = config.image;
    this.title = config.title;
    this.box = new BoxDescriptor(config.box);
    this.intrinsic = config.intrinsic;
    this.url = config.url;
    this.style = config.style;
    this.defaultProps = config.defaultProps;
    this.componentType = config.componentType || 'react';
    this.imageUrl = config.imageUrl;
    this.editor = config.editor;
    this.props = {};
    this.groups = [];
    this.cache = new KeyValueCache<any>();

    if (config.editor && config.editor.groups) {
      for (let group of config.editor.groups) {
        const g = GroupMeta.of(group);
        this.groups.push(g);
        for (let prop of group.props || []) {
          if (prop.name) {
            this.props[prop.name] = new PropMeta(prop)
          }
        }
      }
    }
  }

  createDataFromJson(json: JsonNode): ImmutableMap<string, any> {
    // todo
    const box = new BoxDescriptor(json.box)
    return fromJS({
      ...json,
      box
    })
  }

  /**
   * 创建实例数据
   * @param id 
   * @param box 
   */
  createData(id: number, box: BoxDescriptor | null) {
    let data = ImmutableMap({
      id,
      parent: null,
      name: this.name,
      group: this.group,
      style: ImmutableMap<string, any>(),
      children: [],
      allowDrag: true,
      isMoving: false,
      editMode: false,
      passProps: fromJS(this.defaultProps || {}),
      box
    })

    // 处理props
    for (let key in this.props) {
      const prop: PropMeta = this.props[key];
      // 如果有默认值，就根据path设置属性值
      if (prop.config.default !== undefined) {
        data = PropMeta.setPropValue(
          prop.path,
          data,
          prop.config.default
        )
      }

      // 将yml最外层定义的style也整合进data['style']
      data = data.update("style", (style: any) => {
        const metaStyle = fromJS(this.style) as ImmutableMap<string, any>;
        return style.merge(metaStyle)
      })
    }

    return data

  }
}

