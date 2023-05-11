import { Node, WedoEventName } from "@wedo/meta";
import { WedoEventHandler } from "./types";
export declare class WedoNodeProxy {
    private node;
    private events;
    constructor(node: Node);
    on(key: WedoEventName, handler: WedoEventHandler): () => void;
    memory(data: any): void;
}
