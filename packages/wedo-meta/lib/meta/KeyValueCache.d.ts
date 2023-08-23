export declare class KeyValueCache<T> {
    data: Record<string, T>;
    constructor();
    set(key: string, value: T): void;
    get(key: string): T | null;
}
