import { CustomResponse } from "./standard";

type ServiceFN = (...args: Array<any>) => Promise<CustomResponse>

export function compose(fn1: ServiceFN, fn2: ServiceFN, combiner: (data: any) => Array<any> | false) {
  return async (...args: Array<any>) => {
    const result = await fn1(...args);
    if (!result.success) {
      return result
    }
    const data = result.data;
    const nextArgs = combiner(data);
    if (!nextArgs) {
      return {
        success: false
      }
    }
    return await fn2(...nextArgs)
  }
}