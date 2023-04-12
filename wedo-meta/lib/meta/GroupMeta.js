export class GroupMeta {
    name;
    title;
    disable;
    style;
    // todo ???为什么只要key
    propKeys;
    constructor() {
        this.name = '';
        this.title = '';
        this.style = '';
        this.propKeys = new Set();
    }
    static of(config) {
        const group = new GroupMeta();
        group.name = config.name;
        group.title = config.title;
        group.disable = config.disable || false;
        group.style = config.style;
        if (config.props) {
            config.props.forEach(prop => {
                if (prop.name) {
                    group.propKeys.add(prop.name);
                }
            });
        }
        return group;
    }
    clone() {
        const g = new GroupMeta();
        g.name = this.name;
        g.title = this.title;
        g.style = this.style;
        g.disable = this.disable;
        g.propKeys = new Set([...this.propKeys]);
        return g;
    }
    mergeGroup(group) {
    }
}
