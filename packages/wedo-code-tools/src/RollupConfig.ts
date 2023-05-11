import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import { InputOptions, OutputOptions } from "rollup";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve"

export class RollupConfig {
  constructor(private cwd: string){}

  public inputOptions(): InputOptions {
    return {
      input: path.resolve(this.cwd, "src/main.ts"),
      plugins: this.plugins(),
      external: ["@wedo/runtime"]
    }
  }

  public outputOptions() : OutputOptions {
    return {
      file: path.resolve(this.cwd, "build/index.js"),
      format: "amd",
      name: "index.js"
    }
  }
 
  public plugins() {
    return [
      typescript({
        typescript: require('typescript'),
        tsconfig: path.resolve(this.cwd, "tsconfig.json")
      }),
      commonjs(),
      resolve({
        extensions: ['.ts']
      })]
  }

}