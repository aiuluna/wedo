import { execSync } from "child_process";

export class Rollup {
  constructor(private cwd: string) {}

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
      
    } catch (error) {
      
    }
  }
}