import { WedoNodeProxy } from './WedoNodeProxy';
export class WedoContext {
    page;
    constructor(page) {
        this.page = page;
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
