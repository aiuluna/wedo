import { Topic } from '@wedo/meta';
import { WedoNodeProxy } from './WedoNodeProxy';
import { codeProjectRemote } from '@wedo/request';
export class WedoContext {
    page;
    constructor(page) {
        this.page = page;
        this.page.on(Topic.Initialize).subscribe(() => { });
    }
    async faas(fnName, ...args) {
        return await codeProjectRemote.faas.get(localStorage['x-user'], this.page.name, fnName, ...args);
    }
    select(name) {
        if (!name)
            return null;
        for (let p of this.page.getRoot().bfs()) {
            if (p.getPassProps().get('name') === name)
                return new WedoNodeProxy(p);
        }
        return null;
    }
}
