import { Emitter } from "@wedo/utils";
import { Topic } from "../Topic";
import { ComponentMeta } from "../meta/ComponentMeta";
type ComponentsLoader = {
    loadByName: (group: string, name: string) => ComponentMeta;
};
export declare class Page extends Emitter<Topic> {
    private loader;
    constructor(loader: ComponentsLoader);
    initLoader(): Promise<void>;
}
export {};
