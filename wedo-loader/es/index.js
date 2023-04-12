/*!
  * @wedo/loader 1.0.0
  * Licensed under MIT
  */

import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _inheritsLoose from '@babel/runtime-corejs3/helpers/inheritsLoose';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import { Emitter } from '@wedo/utils';

var ymls = {};
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
var modules = await import.meta.glob('../yml/*.*');
for (var path in modules) {
  console.log('path', path);
  var _path$split = path.split('.'),
    a = _path$split[0];
  var n = a.split('/').pop();
  if (n && n !== 'default') {
    var config = modules[path];
    ymls[config.group + '.' + config.name] = config;
  }
}
console.log('ymls', ymls);
var ComponentsLoader = /*#__PURE__*/function (_Emitter) {
  _inheritsLoose(ComponentsLoader, _Emitter);
  function ComponentsLoader() {
    return _Emitter.call(this) || this;
  }
  /**
   * getInstance
   */
  ComponentsLoader.getInstance = function getInstance() {
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
  };
  var _proto = ComponentsLoader.prototype;
  _proto.load = /*#__PURE__*/function () {
    var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var key, _key$split, group, name;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // @ts-ignore
            for (key in ymls) {
              _key$split = key.split('.'), group = _key$split[0], name = _key$split[1];
              console.log('group=' + group + ', name=' + name);
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function load() {
      return _load.apply(this, arguments);
    }
    return load;
  }();
  return ComponentsLoader;
}(Emitter);
ComponentsLoader.instance = void 0;

export { ComponentsLoader };
