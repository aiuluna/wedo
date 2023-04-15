import { BoxDescriptor } from "../BoxDescriptor";
import { BoxDescriptorInput, JsonNode } from "../standard.types";
import { GroupConfig, GroupMeta } from "./GroupMeta";
import { KeyValueCache } from "./KeyValueCache";
import { PropMeta } from "./PropMeta";
import { Map as ImmutableMap } from 'immutable';
export interface PropsEditorConfigure {
    groups: Array<GroupConfig>;
}
export interface ComponentMetaConfig {
    name: string;
    group: string;
    image: string;
    title: string;
    box: BoxDescriptorInput;
    editor: PropsEditorConfigure;
    description: string;
    intrinsic?: boolean;
    style?: any;
    author: string;
    defaultProps: any;
    componentType: 'vue' | 'react';
    src: string;
    file: string;
    url?: string;
    yml: string;
    imageUrl: string;
    version: string;
}
export declare class ComponentMeta {
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
    props: {
        [key: string]: PropMeta;
    };
    groups: Array<GroupMeta>;
    cache: KeyValueCache<any>;
    constructor(config: ComponentMetaConfig);
    createDataFromJson(json: JsonNode): ImmutableMap<string, any>;
    /**
     * 创建实例数据
     * @param id
     * @param box
     */
    createData(id: number, box: BoxDescriptor | null): ImmutableMap<string, any>;
}
