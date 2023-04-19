import { Topic, ComponentMeta, metaSchema } from '@wedo/meta';
import { Emitter } from '@wedo/utils';
import * as R from 'ramda';
import { Validator } from 'jsonschema';
const metas = {};
const ymls = {};
// @ts-ignore
// require.context('../yml', true, /\.yml$/)
//   .keys()
//   .forEach((key: string) => {
//     key = key.replace('./', '')
//     const [a,] = key.split('.')
//     const n = a.split('/').pop()
//     if (n && n !== 'default') {
//       const config: ComponentMetaConfig = require(`../yml/${key}`)
//       ymls[config.group + '.' + config.name] = config
//     }
//   })
const modules = await import.meta.glob('../yml/*.yml');
for (const path in modules) {
    // "../yml/button.yml"
    let key = path.replace('../yml', '');
    const [a,] = key.split('.');
    const n = a.split('/').pop();
    if (n && n !== 'default') {
        const config = (await modules[path]()).default;
        console.log(config);
        ymls[config.group + '.' + config.name] = config;
    }
}
export class ComponentsLoader extends Emitter {
    static instance;
    static defaultProps;
    state = 0;
    constructor() {
        super();
        this.loadDefault();
    }
    /**
     * getInstance
     */
    static getInstance() {
        if (!ComponentsLoader.instance) {
            ComponentsLoader.instance = new ComponentsLoader();
        }
        // @ts-ignore
        window.componentsLoader = ComponentsLoader.instance;
        return ComponentsLoader.instance;
    }
    async loadByName(group, name) {
        const key = group + '.' + name;
        if (!metas[key]) {
            if (!ymls[key]) {
                throw new Error(`Type ${key} not found.`);
            }
            const customProps = ymls[key];
            if (!ComponentsLoader.defaultProps) {
                await this.loadDefault();
            }
            const props = R.clone(ComponentsLoader.defaultProps);
            const merged = mergeLeft(props, customProps);
            validatorConfig(key, merged);
            const meta = new ComponentMeta(merged);
            metas[key] = meta;
        }
        return metas[key];
    }
    async loadDefault() {
        if (!ComponentsLoader.defaultProps) {
            // @ts-ignore
            const defModule = await import('../yml/default.yml');
            ComponentsLoader.defaultProps = defModule.default;
        }
    }
    async load() {
        if (this.state === 1) {
            this.emit(Topic.RemoteComponentsLoaded);
            return;
        }
        for (let key in ymls) {
            const [group, name] = key.split('.');
            await this.loadByName(group, name);
        }
        console.log('222');
        // todo 远程loadRemote
        this.state = 1;
        this.emit(Topic.RemoteComponentsLoaded);
    }
}
function mergeLeft(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        const list = [...a];
        for (let i = 0; i < b.length; i++) {
            let match = false;
            for (let j = 0; j < a.length; j++) {
                if (b[i].name === a[j].name) {
                    match = true;
                    a[j] = mergeLeft(a[j], b[i]);
                    break;
                }
            }
            if (!match) {
                list.push(b[i]);
            }
        }
        return list;
    }
    else if (typeof a === 'object' && typeof b === 'object') {
        for (let key in b) {
            const val = b[key];
            if (!a[key]) {
                a[key] = b[key];
                continue;
            }
            if (typeof val === 'object') {
                a[key] = mergeLeft(a[key], val);
            }
            else {
                a[key] = val;
            }
        }
    }
    return a;
}
function validatorConfig(file, config) {
    const v = new Validator();
    const result = v.validate(config, metaSchema);
    if (result.errors.length > 0) {
        throw new Error(`Validation failed in :${file}` + result.errors.join('\n'));
    }
}
