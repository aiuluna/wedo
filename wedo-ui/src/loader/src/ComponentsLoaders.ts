import { Validator } from 'jsonschema'
import { Topic } from '../../meta/Topic';
import { Emitter } from '../../object/Emitter';

const metas = {}

// @ts-ignore
// const ymls = require.context('../yml', true, /\.yml$/);
const ymlModules = import.meta.glob('../yml/*.yml');
// window.ymlModules = ymlModules;

for (let key in ymlModules) {
  // const yml = require(key);
  
  // console.log(yml);
}

// console.log('ymls', ymls);
export class ComponentsLoader extends Emitter<Topic>{
  private static instance: ComponentsLoader = new ComponentsLoader();

  /**
   * getInstance
   */
  static getInstance() {
    // console.log(ymls)
    // @ts-ignore
    window.componentsLoader = ComponentsLoader.instance;
    return ComponentsLoader.instance;
  }
}