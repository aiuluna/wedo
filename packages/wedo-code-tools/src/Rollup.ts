import { execSync } from "child_process";
import { RollupConfig } from "./RollupConfig";
import { rollup } from "rollup";

export class Rollup {
  constructor(private cwd: string) { }

  /**
   * 为打包的项目加上运行时环境
   */
  private preBuild() {
    execSync("npm link @wedo/runtime", {
      cwd: this.cwd
    })
  }

  public async build() {
    this.preBuild()
    try {
      console.log('start build...')
      const config = new RollupConfig(this.cwd)
      const bundle = await rollup(config.inputOptions())
      const { output } = await bundle.generate(config.outputOptions())
      for (const chunkOrAsset of output) {
				if (chunkOrAsset.type === 'asset') {
					console.log('Asset', chunkOrAsset.fileName)
				}
				else {
					console.log('Chunk', chunkOrAsset.fileName)
				}
			}
      await bundle.write(config.outputOptions())
      await bundle.close()
      
      return config.outputOptions().file
    } catch (error) {
			console.log("rollup build error")
      console.log(error)
      throw error
    }
  }
}