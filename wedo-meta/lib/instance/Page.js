import { Emitter } from "@wedo/utils";
import { BoxDescriptor } from "../BoxDescriptor";
import { Node } from "./Node";
export class Page extends Emitter {
    root;
    name;
    loader;
    id_base = 1;
    constructor(name, loader) {
        super();
        this.name = name;
        this.loader = loader;
        1;
        const meta = this.loader.loadByName("container", "root");
        const box = new BoxDescriptor({
            left: 0,
            top: 0,
            width: 3200,
            height: 3200
        }, meta);
        this.root = new Node(meta, meta.createData(this.createId(), box));
    }
    createId() {
        return this.id_base++;
    }
}
