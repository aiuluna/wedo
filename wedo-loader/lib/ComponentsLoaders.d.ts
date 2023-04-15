import { Topic, ComponentMetaConfig, ComponentMeta } from '@wedo/meta';
import { Emitter } from '@wedo/utils';
export declare class ComponentsLoader extends Emitter<Topic> {
    private static instance;
    static defaultProps: ComponentMetaConfig;
    private state;
    constructor();
    /**
     * getInstance
     */
    static getInstance(): ComponentsLoader;
    loadByName(group: string, name: string): Promise<ComponentMeta>;
    loadDefault(): Promise<void>;
    load(): Promise<void>;
}
