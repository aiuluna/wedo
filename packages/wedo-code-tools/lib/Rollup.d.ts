export declare class Rollup {
    private cwd;
    constructor(cwd: string);
    /**
     * 为打包的项目加上运行时环境
     */
    private preBuild;
    build(): Promise<string>;
}
