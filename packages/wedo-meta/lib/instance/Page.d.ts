import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { ComponentMeta } from "../meta/ComponentMeta";
import { Node } from "./Node";
import { JsonNode, JsonPage, NodeType } from '../standard.types';
type ComponentsLoader = {
    loadByName: (group: string, name: string) => Promise<ComponentMeta>;
};
export declare class Page extends Emitter<Topic> {
    private root;
    name: string;
    private loader;
    private id_base;
    private nodes;
    private links;
    pageNode: NodeType;
    constructor(name: string, json: JsonPage, loader: ComponentsLoader);
    createId(): number;
    private init;
    private initRoot;
    private linkPage;
    private fromJson;
    getNodeById(id: number): Node;
    createFromJSON(json: JsonNode): Promise<Node>;
    createFromMetaNew(meta: ComponentMeta, position: [number, number]): Node;
    getRoot(): Node;
}
export {};
