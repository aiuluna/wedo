// @ts-ignore
const modules = import.meta.glob('../localComponents/*.tsx');
const localComponentsMap: { [key: string]: React.ComponentClass } = {}
const localComponentsMap1: { [key: string]: React.ComponentClass } = {}


const loadLocalComponentsMap = async () => {
  for (const path in modules) {
    const mod = await modules[path]()
    const file = mod.default;
    let key = path.replace('../localComponents/', '');
    const [a,] = key.split('.');
    localComponentsMap['local.' + a] = file;

    // let key = path.replace('../localComponents/', '');
    // const [a,] = key.split('.');
    // localComponentsMap1['local.' + a] = await import(path).then(m => m.default); 	// import the module and store it in localComponentsMap

    console.log('localComponentsMap', localComponentsMap, localComponentsMap1)
  }

  // for (const path in modules) {
  //   let key = path.replace('../localComponents/', '');
  //   modules[key]().then((mod) => {
  //     const file = mod.default;

  //   });
  // }
}

export const getLocalComponentsByURL = async (url: string): Promise<React.ComponentClass> => {
  if (!Object.keys(localComponentsMap).length) {
    await loadLocalComponentsMap()
  }
  return localComponentsMap[url] || null; 	// null if module not found for the given URL or localComponentsMap is empty. 	// if this happens
}
// for (const path in modules) {
//   // "../yml/button.yml"
//   let key = path.replace('../yml', '')
//   const [a,] = key.split('.')
//   const n = a.split('/').pop()
//   if (n && n !== 'default') {
//     const config: ComponentMetaConfig = (await modules[path]()).default;
//     ymls[config.group + '.' + config.name] = config;
//   }
// }