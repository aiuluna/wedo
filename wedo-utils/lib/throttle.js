export function throttle(fn, interval = 13, defaultVal) {
    let open = true;
    return (...args) => {
        if (open) {
            open = false;
            const result = fn(...args);
            const timestamp = new Date().getTime();
            // 精确时间段
            // 将一个interval作为一个时间段，则mod是从上一个时间段过了mod的时间，所以到下一个时间段的时间是interval-mod
            const mod = interval % timestamp;
            setTimeout(() => {
                open = true;
            }, interval - mod);
            return result;
        }
        return defaultVal;
    };
}
