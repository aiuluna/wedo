declare type FN = (...args: Array<any>) => void;
export declare function throttle(fn: FN, interval?: number, defaultVal?: any): (...args: Array<any>) => any;
export {};
