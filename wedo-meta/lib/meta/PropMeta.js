export class PropMeta {
    disable;
    path;
    config;
    constructor(config) {
        this.config = config;
        this.path = config.path.split('.');
    }
}
