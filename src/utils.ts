/**
 * 生成cid
 * @return string
 * */
export function getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c: string) {
            const r:number = Math.random() * 16 | 0,
                v:number = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

/**
 * 获取getStorageSync方法
 * @return string
 * @param key
 * */
export function getStorageSync(key: string): string | undefined {
    if(!key) return ;
    /* eslint-disable */
    if (typeof window == 'object' && typeof window.localStorage == 'object') {
        // @ts-ignore
        return localStorage.getItem(key)
    }

    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getStorageSync == 'function') {
        // @ts-ignore
        return uni.getStorageSync(key)
    }

    // @ts-ignore
    if (typeof wx == 'object' && typeof wx.getStorageSync == 'function') {
        // @ts-ignore
        return wx.getStorageSync(key)
    }
    /* eslint-enable */
}

/**
 * 获取setStorageSync方法
 * @return string
 * @param key
 * @param value
 * */
export function setStorageSync(key: string, value: string) {
    if(!key) return ;
    /* eslint-disable */
    if (typeof window == 'object' && typeof window.localStorage == 'object') {
        // @ts-ignore
        return localStorage.setItem(key, value)
    }
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.setStorageSync == 'function') {
        // @ts-ignore
        return uni.setStorageSync(key, value)
    }
    // @ts-ignore
    if (typeof wx == 'object' && typeof wx.setStorageSync == 'function') {
        // @ts-ignore
        return wx.setStorageSync(key, value)
    }
    /* eslint-enable */
}

/**
 * 获取getSystemInfo方法
 * @return object
 * */
export function getSystemInfo(): object {
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getSystemInfo == 'function') {
        // @ts-ignore
        return uni.getSystemInfo()
    }else {
        // @ts-ignore
        return wx.getSystemInfo()
    }
    /* eslint-enable */
}

/**
 * 获取getSystemInfo方法
 * @param options
 * @param context
 * */
export function request(options:object, context: object) {
    /* eslint-disable */
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getSystemInfo == 'function') {
        // @ts-ignore
        return uni.request(options).bind(context)
    }else {
        // @ts-ignore
        return wx.request(options).bind(context)
    }
    /* eslint-enable */
}

// 支持Measurement Protocol“&”符号语法
export function hit_param_fix(paramName: string){
    return String(paramName).replace(/^&/, '');
}