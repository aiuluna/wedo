"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupConfig = void 0;
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const path_1 = __importDefault(require("path"));
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
class RollupConfig {
    constructor(cwd) {
        this.cwd = cwd;
    }
    inputOptions() {
        return {
            input: path_1.default.resolve(this.cwd, "src/main.ts"),
            plugins: this.plugins(),
            external: ["@wedo/runtime"]
        };
    }
    outputOptions() {
        return {
            file: path_1.default.resolve(this.cwd, "build/index.js"),
            format: "amd",
            name: "index.js"
        };
    }
    plugins() {
        return [
            (0, rollup_plugin_typescript2_1.default)({
                typescript: require('typescript'),
                tsconfig: path_1.default.resolve(this.cwd, "tsconfig.json")
            }),
            (0, plugin_commonjs_1.default)(),
            (0, plugin_node_resolve_1.default)({
                extensions: ['.ts']
            })
        ];
    }
}
exports.RollupConfig = RollupConfig;
