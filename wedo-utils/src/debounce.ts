declare type FN = (...args: Array<any>) => void

/**
 * 防抖函数
 * @param fn 
 * @param delay 
 * @param immediate 立即执行标志
 * @returns 
 */
export function debounce(fn: FN, delay = 300, immediate = false) {
  let timeId: number | undefined;
  return function (this: any, ...args: Array<any>) {
    const context = this;
    const callNow = immediate && !timeId;

    if (timeId) {
      clearTimeout(timeId)
    }

    timeId = setTimeout(() => {
      timeId = undefined;
      if (!callNow) {
        fn.apply(context, args)
      }
    }, delay);

    if (callNow) {
      fn.apply(context, args)
    }
  }
}