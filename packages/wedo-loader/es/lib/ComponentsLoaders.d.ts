import { Topic } from '@wedo/meta';
import { Emitter } from '@wedo/utils';
export declare class ComponentsLoader extends Emitter<Topic> {
    private static instance;
    constructor();
    /**
     * getInstance
     */
    static getInstance(): ComponentsLoader;
    load(): Promise<void>;
}
