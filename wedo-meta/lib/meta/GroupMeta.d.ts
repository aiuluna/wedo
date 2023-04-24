import { PropConfig } from "./PropMeta";
export interface GroupConfig {
    name: string;
    title: string;
    disabled?: boolean;
    style: any;
    props?: Array<PropConfig>;
}
export declare class GroupMeta {
    name: string;
    title: string;
    disabled?: boolean;
    style: any;
    propKeys: Set<string>;
    private constructor();
    static of(config: GroupConfig): GroupMeta;
    clone(): GroupMeta;
    mergeGroup(group: GroupMeta): void;
}
