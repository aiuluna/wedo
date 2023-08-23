"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rollup = void 0;
const child_process_1 = require("child_process");
const RollupConfig_1 = require("./RollupConfig");
const rollup_1 = require("rollup");
class Rollup {
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
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            this.preBuild();
            try {
                console.log('start build...');
                const config = new RollupConfig_1.RollupConfig(this.cwd);
                const bundle = yield (0, rollup_1.rollup)(config.inputOptions());
                const { output } = yield bundle.generate(config.outputOptions());
                for (const chunkOrAsset of output) {
                    if (chunkOrAsset.type === 'asset') {
                        console.log('Asset', chunkOrAsset.fileName);
                    }
                    else {
                        console.log('Chunk', chunkOrAsset.fileName);
                    }
                }
                yield bundle.write(config.outputOptions());
                yield bundle.close();
                return config.outputOptions().file;
            }
            catch (error) {
                console.log("rollup build error");
                console.log(error);
                throw error;
            }
        });
    }
}
exports.Rollup = Rollup;
