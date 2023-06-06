import { Page } from '@wedo/meta';
import { WedoNodeProxy } from './WedoNodeProxy';
export declare class WedoContext {
    private page;
    constructor(page: Page);
    faas(fnName: string, ...args: string[]): Promise<import("@wedo/request/dist/cjs/standard").CustomResponse>;
    select(name: string): WedoNodeProxy;
}
