export class PropMeta {
    disable;
    path;
    config;
    constructor(config) {
        this.config = config;
        this.path = config.path.split('.');
    }
    static setPropValue(path, data, value) {
        // box放到data的box属性里
        if (path[0] === 'rect') {
            const rect = data.get('rect').clone();
            rect[path[1]] = value;
            return data.set('rect', rect);
        }
        if (path[0] === 'box') {
            // ['box','left']
            const box = data.get('box').clone();
            box[path[1]] = value;
            return data;
        }
        return data.setIn(path, value);
    }
}
