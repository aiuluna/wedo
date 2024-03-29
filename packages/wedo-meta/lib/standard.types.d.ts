import { Map as ImmutableMap } from 'immutable';
import { Node } from './instance/Node';
import { BoxDescriptor } from './BoxDescriptor';
export type SizeMode = "fill" | "value" | "fixed" | 'auto';
export type SizeUnitInput = {
    value: number;
    unit: string;
    mode: SizeMode;
};
export type CSSPosition = "absolute" | "relative";
export type CSSDisplay = "block" | "flex";
export type FlexDirection = "row" | "column" | "";
export type BoxDescriptorInput = {
    movable?: boolean;
    resizable?: boolean;
    container?: boolean;
    position?: CSSPosition;
    display?: CSSDisplay;
    flexDirection?: FlexDirection;
    selectable?: boolean;
    left?: number | string | SizeUnitInput;
    top?: number | string | SizeUnitInput;
    width: number | string | SizeUnitInput;
    height: number | string | SizeUnitInput;
    marginLeft?: number | string | SizeUnitInput;
    marginTop?: number | string | SizeUnitInput;
    marginRight?: number | string | SizeUnitInput;
    marginBottom?: number | string | SizeUnitInput;
};
export type NodeData = ImmutableMap<string, any>;
export type BasicJsonNode = {
    type?: string;
    group: string;
    style?: any;
    name: string;
    children?: Array<JsonNode>;
    id?: number;
    passProps?: any;
};
export type NodeInstanceJsonStructure = BasicJsonNode & {
    box: BoxDescriptor;
};
export type JsonNode = BasicJsonNode & {
    box: BoxDescriptorInput;
    linkedId?: number;
};
export type JsonPage = {
    links: Record<number, JsonNode>;
    page: JsonNode;
};
export type NodeType = Node;
export type RenderOptions = {
    key?: string;
    childrenProps?: Record<string, any>;
    ele?: HTMLElement;
};
export type RenderFor = 'react' | 'vue' | 'dom';
export type WedoEventName = 'click' | 'f12' | 'data';
