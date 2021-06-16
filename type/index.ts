// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
export interface HitType {
    v ?: number;      // 协议版本
    cid ?: string;    // 设备ID
    ds ?: string;     // 数据来源
    ul ?: string;     // 设备语言
    de ?: string;     // 编码格式
    sd ?: string;     // 屏幕颜色
    je ?: number;     // 指定是否启动了java
    an ?: string;     // 应用名称
    av ?: string;     // 设备版本
    vp ?: string;     // 视口大小
    tid ?: string;    // 跟踪ID
    cd ?: string;     // 屏幕名称
    aip ?: boolean;   // 对 IP 地址进行匿名处理
    aid ?: string;    // 应用ID
    aiid ?: string;   // 设置应用安装程序ID
    geoid ?: string;  // 地理位置
    qt ?: number;     // 队列时间
    z ?: number;      // 缓存无效化宏
}