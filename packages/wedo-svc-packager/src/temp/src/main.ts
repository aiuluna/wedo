import {WedoContext} from '@wedo/runtime'
function run(context: WedoContext){
  console.log('run......')
  const btn = context.select('btn');
  console.log('btn', btn)
  btn.on('click', () => {
    alert('click 点我')
  })
}
export default run