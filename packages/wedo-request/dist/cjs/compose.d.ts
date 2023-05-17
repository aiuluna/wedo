import { CustomResponse } from "./standard";
type ServiceFN = (...args: Array<any>) => Promise<CustomResponse>;
export declare function compose(fn1: ServiceFN, fn2: ServiceFN, combiner: (data: any) => Array<any> | false): (...args: Array<any>) => Promise<CustomResponse>;
export {};
