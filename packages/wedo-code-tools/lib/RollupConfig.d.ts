import { InputOptions, OutputOptions } from "rollup";
export declare class RollupConfig {
    private cwd;
    constructor(cwd: string);
    inputOptions(): InputOptions;
    outputOptions(): OutputOptions;
    plugins(): import("rollup").Plugin[];
}
