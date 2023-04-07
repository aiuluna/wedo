// import {GroupMeta} from './GroupMeta'
import { PropMeta } from './PropMeta';
import { Map as ImmutableMap, fromJS } from 'immutable';
import { BoxDescriptor } from '../BoxDescriptor';
export class ComponentMeta {
    name;
    group;
    image;
    title;
    box;
    editor;
    intrinsic;
    url;
    style;
    defaultProps;
    imageUrl;
    componentType;
    props;
    groups;
    // cache : KeyValueCache<any>
    constructor(config) {
        // this.cache = new KeyValueCache()
        this.name = config.name;
        this.group = config.group;
        this.image = config.image;
        this.title = config.title;
        this.box = new BoxDescriptor(config.box);
        this.intrinsic = config.intrinsic;
        this.url = config.url;
        this.style = config.style;
        this.defaultProps = config.defaultProps;
        this.imageUrl = config.imageUrl;
        this.componentType = config.componentType || 'react';
        this.editor = config.editor;
        this.props = {};
        this.groups = [];
        if (config.editor && config.editor.groups) {
            for (let group of config.editor.groups) {
                // this.groups.push(GroupMeta.of(group))
                // for (let prop of group.props || []) {
                //   if(prop.name) {
                //     this.props[prop.name] = new PropMeta(prop)
                //   }
                // }
            }
        }
    }
    createDataFromJson(json) {
        const box = new BoxDescriptor(json.box, this);
        return fromJS({
            ...json,
            box
        });
    }
    /**
     * 创建实例数据
     * @param id
     * @param box
     * @returns
     */
    createData(id, box) {
        let data = ImmutableMap({
            id,
            parent: null,
            name: this.name,
            group: this.group,
            style: ImmutableMap(),
            children: [],
            allowDrag: true,
            isMoving: false,
            editMode: false,
            passProps: fromJS(this.defaultProps || {}),
            box
        });
        for (let key in this.props) {
            const prop = this.props[key];
            if (prop.config.default !== undefined) {
                data = PropMeta.setPropValue(prop.path, data, prop.config.default);
            }
        }
        data = data.update("style", (style) => {
            const metaStyle = fromJS(this.style);
            return style.merge(metaStyle);
        });
        return data;
    }
}
