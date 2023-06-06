import { WedoContext } from '@wedo/runtime'


async function run(ctx: WedoContext) {
  const btn = ctx.select('btn');
  const text = ctx.select('text');
  btn.on('click', async function () {
    const data = await fetch('http://localhost:7004/huzhang/default/fn3')
    const json = await data.json();
    text.memory(json.name)
  });
  const res = await ctx.faas('fn1');
  console.log(res)
}
export default run