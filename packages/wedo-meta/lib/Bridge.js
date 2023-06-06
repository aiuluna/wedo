import { Topic } from "./Topic";
export class Bridge {
    node;
    page;
    mode;
    dataChangeHandlers = [];
    renderForReact;
    constructor(node, page, mode = 'editor') {
        this.mode = mode;
        this.node = node;
        this.page = page;
        node?.on(Topic.MemorizedDataChanged).subscribe(() => {
            console.log('Topic.MemorizedDataChanged');
            this.dataChangeHandlers.forEach(h => h());
        });
    }
    getNode() {
        if (!this.node) {
            throw Error("member node not exists on bridge, maybe this is a mocked bridge.");
        }
        return this.node;
    }
    getPage() {
        if (!this.page) {
            throw Error("member page not exists on bridge, maybe this is a mocked bridge.");
        }
        return this.page;
    }
    getPassProps() {
        return this.getNode().getPassProps().toJS();
    }
    getMode() {
        return this.mode;
    }
    setPropValue(key, value) {
        this.getNode().setPassPropValue(key, value);
        this.getNode().emit(Topic.NodePropUpdated);
    }
    render(type, node, options) {
        switch (type) {
            case 'dom':
                return null;
            case 'react':
                return this.renderForReact(node, options);
        }
    }
    addNode(node) {
        this.getNode().addToRelative(node);
        return node;
    }
    getMemorizedData() {
        return this.getNode().getMemorizedData();
    }
    /**
     * preview从node中缓存的数据
     * @returns
     */
    getNodeData() {
        const data = this.getMemorizedData();
        const path = this.node?.getPassProps().get('dataPath');
        if (!path) {
            return data;
        }
        return data ? data[path] : null;
    }
    onDataChange(handler) {
        this.dataChangeHandlers.push(handler);
    }
    notify(eventType) {
        this.node?.emit(Topic.ExternalEventNotify, {
            type: eventType,
            node: this.node
        });
    }
    passProps() {
        return this.node?.getPassProps().toJS();
    }
    on(topic) {
        return this.node?.on(topic);
    }
}
