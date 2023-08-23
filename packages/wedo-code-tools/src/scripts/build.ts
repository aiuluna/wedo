import path from "path"
import { Rollup } from "../Rollup"

async function run() {
  console.log(path.resolve(__dirname, '../../../wedo-svc-packager/src/temp/'))
  // const rollup = new Rollup(path.resolve(__dirname, '../../../wedo-svc-packager/src/temp/'))
  const rollup = new Rollup(path.resolve(__dirname, './temp'))
  await rollup.build()
}

run()