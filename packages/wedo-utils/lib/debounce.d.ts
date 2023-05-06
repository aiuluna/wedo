declare type FN = (...args: Array<any>) => void;
/**
 * 防抖函数
 * @param fn
 * @param delay
 * @param immediate 立即执行标志
 * @returns
 */
export declare function debounce(fn: FN, delay?: number, immediate?: boolean): (this: any, ...args: Array<any>) => void;
export {};
