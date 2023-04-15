import { Emitter } from "@wedo/utils";
export class Page extends Emitter {
    loader;
    constructor(loader) {
        super();
        this.loader = loader;
    }
    async initLoader() {
        // await this.loader.load()
    }
}
