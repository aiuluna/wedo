import { BoxDescriptor } from "../BoxDescriptor";
import { GroupMeta } from "./GroupMeta";
import { KeyValueCache } from "./KeyValueCache";
import { PropMeta } from "./PropMeta";
import { fromJS } from 'immutable';
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
    props = {};
    groups;
    cache;
    constructor(config) {
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
        this.cache = new KeyValueCache();
        if (config.editor && config.editor.groups) {
            for (let group of config.editor.groups) {
                const g = GroupMeta.of(group);
                this.groups.push(g);
                for (let prop of group.props || []) {
                    if (prop.name) {
                        this.props[prop.name] = new PropMeta(prop);
                    }
                }
            }
        }
    }
    createDataFromJson(json) {
        // todo
        const box = new BoxDescriptor(json.box);
        return fromJS({
            ...json,
            box
        });
    }
    createData() {
    }
}
