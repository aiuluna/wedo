export default class FCBuilder {
    private cwd;
    constructor(cwd: string);
    build(): Promise<void>;
}
