// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
export interface HitType {
    // 协议版本
    v?: number;
    // 设备ID
    cid?: string;
    // 用户ID
    uid?: string;
    // 数据来源
    ds?: string;
    // 设备语言
    ul?: string;
    // 编码格式
    de?: string;
    // 屏幕颜色
    sd?: string;
    // 指定是否启动了java
    je?: 0 | 1;
    // 应用名称
    an?: string;
    // 设备版本
    av?: string;
    // 视口大小
    vp?: string;
    // 跟踪ID
    tid?: string;
    // 屏幕名称
    cd?: string;
    // 对 IP 地址进行匿名处理
    aip?: boolean;
    // 应用ID
    aid?: string;
    // 设置应用安装程序ID
    aiid?: string;
    // 地理位置
    geoid?: string;
    // 队列时间
    qt?: number;
    // 缓存无效化宏
    z?: number;
    // 匹配类型
    t?: 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';
    // 非互动匹配
    ni?: number;
    // 促销操作
    promoa?: string;
    // 会话设置
    sc?: 'start' | 'end';
    // 事件类别
    ec?: string;
    // 事件动作
    ea?: string;
    // 事件标签
    el?: string;
    // 事件值
    ev?: number;
    // 社交网络
    sn?: string;
    // 社交操作
    sa?: string;
    // 社交操作目标
    st?: string;
    // 错误说明
    exd?: string;
    // 错误是否验证
    exf?: 0 | 1;
    // 用户计时类别
    utc?: string;
    // 用户计时变量名称
    utv?: string;
    // 用户计时时间
    utt?: number;
    // 用户计时标签
    utl?: string;
    // 页面加载时间
    plt?: number;
    // DNS时间
    dns?: number;
    // 页面下载时间
    pdt?: number;
    // 重定向响应时间
    rrt?: number;
    // tcp连接时间
    tcp?: number;
    // 服务器响应时间
    srt?: number;
    // DOM互动时间
    dit?: number;
    // 内容加载时间
    clt?: number;
    // 产品操作
    pa ?: 'detail'|'click'|'add'|'remove'|'checkout'|'checkout_option'|'purchase'|'refund';
    // 结帐步骤
    cos ?: number;
    // 结帐步骤选项
    col ?: string;
    // 产品操作列表
    pal ?: string;
    // 产品列表来源
    pls ?: string;
    // 交易关联公司
    ta ?: string;
    // 交易使用的优惠券代码
    tcc ?: string;
    // 交易ID
    ti ?: string;
    // 交易收入
    tr ?: number;
    // 交易运费
    ts ?: number;
    // 交易税费
    tt ?: number;
    // 广告系列来源
    cs ?: string;
    // 广告系列媒介
    cm ?: string;
    // 广告系列关键字
    ck ?: string;
    // 广告系列内容
    cc ?: string;
    // 广告系列名称
    cn ?: string;
    // Google Ads ID
    gclid ?: string;
    // Google 展示广告 ID
    dclid ?: string;
}