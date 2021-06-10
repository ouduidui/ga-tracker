import {SystemInfo} from "../type";

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
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.getStorageSync == 'function') {
        // @ts-ignore
        return uni.getStorageSync(key)
    }else {
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
    // @ts-ignore
    if (typeof uni == 'object' && typeof uni.setStorageSync == 'function') {
        // @ts-ignore
        return uni.setStorageSync(key, value)
    }else {
        // @ts-ignore
        return wx.setStorageSync(key, value)
    }
    /* eslint-enable */
}

/**
 * 获取getSystemInfo方法
 * @return object
 * */
export function getSystemInfo(): SystemInfo {
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
