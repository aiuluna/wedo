import { Page } from '@wedo/meta';
import { WedoNodeProxy } from './WedoNodeProxy';
export declare class WedoContext {
    private page;
    constructor(page: Page);
    select(name: string): WedoNodeProxy;
}
