import { Emitter } from '@wedo/utils';
// import { Emitter } from './Emiter';
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
const modules = await import.meta.glob('../yml/*.*');
for (const path in modules) {
    console.log('path', path);
    const [a,] = path.split('.');
    const n = a.split('/').pop();
    if (n && n !== 'default') {
        const config = modules[path];
        ymls[config.group + '.' + config.name] = config;
    }
}
console.log('ymls', ymls);
export class ComponentsLoader extends Emitter {
    static instance;
    constructor() {
        super();
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
        console.log('ComponentsLoader.instance');
        return ComponentsLoader.instance;
        // @ts-ignore
        // window.componentsLoader = ComponentsLoader.instance;
        // return ComponentsLoader.instance;
    }
    async load() {
        // @ts-ignore
        for (let key in ymls) {
            const [group, name] = key.split('.');
            console.log('group=' + group + ', name=' + name);
        }
    }
}
