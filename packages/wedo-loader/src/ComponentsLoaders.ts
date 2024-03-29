import { Topic, ComponentMetaConfig, ComponentMeta, metaSchema } from '@wedo/meta';
import { Emitter } from '@wedo/utils';
import * as R from 'ramda'
// import { Validator } from 'jsonschema'
import Ajv from "ajv"

const metas: { [key: string]: ComponentMeta } = {}
const ymls: { [key: string]: ComponentMetaConfig } = {}


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
  let key = path.replace('../yml', '')
  const [a,] = key.split('.')
  const n = a.split('/').pop()
  if (n && n !== 'default') {
    const config: ComponentMetaConfig = (await modules[path]()).default;
    ymls[config.group + '.' + config.name] = config;
  }
}
export class ComponentsLoader extends Emitter<Topic>{
  private static instance: ComponentsLoader;

  static defaultProps: ComponentMetaConfig;
  private state: number = 0;
  list: Array<ComponentMeta>;

  constructor() {
    super()
    this.list = [];
    this.loadDefault()
  }

  /**
   * getInstance
   */
  static getInstance() {
    if (!ComponentsLoader.instance) {
      ComponentsLoader.instance = new ComponentsLoader();
    }
    // @ts-ignore
    window.componentsLoader = ComponentsLoader.instance
    return ComponentsLoader.instance;
  }

  public async loadByName(group: string, name: string): Promise<ComponentMeta> {
    const key = group + '.' + name;
    if (!metas[key]) {
      if (!ymls[key]) {
        throw new Error(`Type ${key} not found.`)
      }
      const customProps = ymls[key];
      if (!ComponentsLoader.defaultProps) {
        await this.loadDefault()
      }
      const props = R.clone(ComponentsLoader.defaultProps)
      const merged = mergeLeft(props, customProps);
      validatorConfig(key, merged)
      const meta = new ComponentMeta(merged)
      metas[key] = meta
    }
    return metas[key]
  }

  async loadDefault(): Promise<void> {
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
      await this.loadByName(group, name)
    }
    // todo 远程loadRemote
    this.state = 1;
    this.emit(Topic.RemoteComponentsLoaded);
    this.list = Object.values(metas).filter(x => x.intrinsic !== true)
  }
}

function mergeLeft(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const list = [...a];
    for (let i = 0; i < b.length; i++) {
      let match = false;
      for (let j = 0; j < a.length; j++) {
        if (b[i].name === a[j].name) {
          match = true;
          a[j] = mergeLeft(a[j], b[i])
          break;
        }
      }

      if (!match) {
        list.push(b[i])
      }
    }
    return list;
  } else if (typeof a === 'object' && typeof b === 'object') {
    for (let key in b) {
      const val = b[key];
      if (!a[key]) {
        a[key] = b[key]
        continue;
      }

      if (typeof val === 'object') {
        a[key] = mergeLeft(a[key], val)
      } else {
        a[key] = val
      }
    }
  }
  return a;

}

function validatorConfig(file: string, config: ComponentMetaConfig) {
  const ajv = new Ajv() 
  const validate = ajv.compile(metaSchema)
  const result = validate(config)
  if (!result) {
    throw new Error(`Validation failed in :${file}` + validate.errors?.join('\n'))
  }

  // const v = new Validator()
  // const result = v.validate(config, metaSchema)
  // if (result.errors.length > 0) {
  //   throw new Error(`Validation failed in :${file}` + result.errors.join('\n'))
  // }
}