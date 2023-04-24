import { NodeData } from "../standard.types";
export interface PropConfig {
    name: string;
    label?: string;
    props?: any;
    disabled?: boolean;
    type: string;
    path: string;
    default?: any;
    row?: number;
    rowLabel?: string;
    selections?: any;
    children?: Array<PropConfig>;
}
export declare class PropMeta {
    disabled?: boolean;
    path: Array<string>;
    config: PropConfig;
    constructor(config: PropConfig);
    static setPropValue(path: Array<string>, data: NodeData, value: any): NodeData;
    static getPropValue(path: Array<string>, data: NodeData): any;
}
