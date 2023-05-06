import { Node } from "./instance/Node";
import { Page } from "./instance/Page";
import { RenderFor, RenderOptions } from "./standard.types";
type BridgeMode = 'editor' | 'render';
export declare class Bridge {
    private node?;
    private page?;
    private mode;
    private dataChangeHandlers;
    renderForReact?: (node: Node, options: RenderOptions) => any;
    constructor(node?: Node, page?: Page, mode?: BridgeMode);
    getNode(): Node;
    getPage(): Page;
    getPassProps(): {
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
    };
    getMode(): BridgeMode;
    setPropValue(key: Array<string>, value: any): void;
    render(type: RenderFor, node: Node, options: RenderOptions): any;
    addNode(node: Node): Node;
    getMemorizedData(): any;
    onDataChange(handler: Function): void;
}
export {};
