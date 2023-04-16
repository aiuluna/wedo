import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { ComponentMeta } from "../meta/ComponentMeta";
type ComponentsLoader = {
    loadByName: (group: string, name: string) => ComponentMeta;
};
export declare class Page extends Emitter<Topic> {
    private root;
    private name;
    private loader;
    private id_base;
    constructor(name: string, loader: ComponentsLoader);
    createId(): number;
}
export {};
