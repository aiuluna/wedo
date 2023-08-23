export class PubSub {
    events;
    constructor() {
        this.events = new Map();
    }
    // 订阅方法
    subscribe(topic, fn) {
        if (!this.events.has(topic)) {
            this.events.set(topic, []);
        }
        this.events.get(topic)?.push(fn);
    }
    // 发布方法
    publish(topic, data) {
        if (this.events.has(topic)) {
            this.events.get(topic)?.forEach(fn => {
                fn(data);
            });
        }
    }
    // 删除指定任务
    unsubscribe(topic, fn) {
        if (this.events.has(topic)) {
            const idx = this.events.get(topic)?.findIndex(cb => cb === fn) || -1;
            if (idx > -1) {
                this.events.get(topic)?.splice(idx, 1);
            }
            if (!this.events.get(topic)?.length) {
                this.events.delete(topic);
            }
        }
    }
    // 删除topic下所有任务
    unsubscribeAll(topic) {
        if (this.events.has(topic)) {
            this.events.delete(topic);
        }
    }
}
