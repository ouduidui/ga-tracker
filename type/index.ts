// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
export interface HitType {
    // 协议版本
    v ?: number;
    // 设备ID
    cid ?: string;
    // 数据来源
    ds ?: string;
    // 设备语言
    ul ?: string;
    // 编码格式
    de ?: string;
    // 屏幕颜色
    sd ?: string;
    // 指定是否启动了java
    je ?: 0 | 1;
    // 应用名称
    an ?: string;
    // 设备版本
    av ?: string;
    // 视口大小
    vp ?: string;
    // 跟踪ID
    tid ?: string;
    // 屏幕名称
    cd ?: string;
    // 对 IP 地址进行匿名处理
    aip ?: boolean;
    // 应用ID
    aid ?: string;
    // 设置应用安装程序ID
    aiid ?: string;
    // 地理位置
    geoid ?: string;
    // 队列时间
    qt ?: number;
    // 缓存无效化宏
    z ?: number;
    // 匹配类型
    t ?: 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';
    // 非互动匹配
    ni ?: number;
    // 促销操作
    promoa ?: string;
    // 会话设置
    sc ?: 'start' | 'end';
}