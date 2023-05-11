"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rollup = void 0;
const child_process_1 = require("child_process");
const RollupConfig_1 = require("./RollupConfig");
const rollup_1 = require("rollup");
class Rollup {
    cwd;
    constructor(cwd) {
        this.cwd = cwd;
    }
    /**
     * 为打包的项目加上运行时环境
     */
    preBuild() {
        (0, child_process_1.execSync)("npm link @wedo/runtime", {
            cwd: this.cwd
        });
    }
    async build() {
        this.preBuild();
        try {
            console.log('start build...');
            const config = new RollupConfig_1.RollupConfig(this.cwd);
            const bundle = await (0, rollup_1.rollup)(config.inputOptions());
            const { output } = await bundle.generate(config.outputOptions());
            for (const chunkOrAsset of output) {
                if (chunkOrAsset.type === 'asset') {
                    console.log('Asset', chunkOrAsset.fileName);
                }
                else {
                    console.log('Chunk', chunkOrAsset.fileName);
                }
            }
            await bundle.write(config.outputOptions());
            await bundle.close();
            return config.outputOptions().file;
        }
        catch (error) {
            console.log("rollup build error");
            console.log(error);
            throw error;
        }
    }
}
exports.Rollup = Rollup;
