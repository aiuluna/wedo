import { Topic } from "@wedo/meta";
export class WedoNodeProxy {
    node;
    events;
    constructor(node) {
        this.node = node;
        this.events = {};
        this.node.on(Topic.ExternalEventNotify).subscribe((evt) => {
            if (this.events[evt.type]) {
                this.events[evt.type].forEach(h => h(evt));
            }
        });
    }
    on(key, handler) {
        if (!this.events[key]) {
            this.events[key] = [];
        }
        this.events[key].push(handler);
        return () => {
            this.events[key] = this.events[key].filter(x => x !== handler);
        };
    }
    memory(data) {
        this.node.memory(data);
    }
}
