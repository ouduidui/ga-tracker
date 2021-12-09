declare type HitType = {
    v?: number;
    cid?: string;
    uid?: string;
    ds?: string;
    ul?: string;
    de?: string;
    sd?: string;
    je?: 0 | 1;
    an?: string;
    av?: string;
    vp?: string;
    tid?: string;
    cd?: string;
    aip?: boolean;
    aid?: string;
    aiid?: string;
    geoid?: string;
    qt?: number;
    z?: number;
    t?: 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';
    ni?: number;
    promoa?: string;
    sc?: 'start' | 'end';
    ec?: string;
    ea?: string;
    el?: string;
    ev?: number;
    sn?: string;
    sa?: string;
    st?: string;
    exd?: string;
    exf?: 0 | 1;
    utc?: string;
    utv?: string;
    utt?: number;
    utl?: string;
    plt?: number;
    dns?: number;
    pdt?: number;
    rrt?: number;
    tcp?: number;
    srt?: number;
    dit?: number;
    clt?: number;
    pa?: 'detail' | 'click' | 'add' | 'remove' | 'checkout' | 'checkout_option' | 'purchase' | 'refund';
    cos?: number;
    col?: string;
    pal?: string;
    pls?: string;
    ta?: string;
    tcc?: string;
    ti?: string;
    tr?: number;
    ts?: number;
    tt?: number;
    cs?: string;
    cm?: string;
    ck?: string;
    cc?: string;
    cn?: string;
    gclid?: string;
    dclid?: string;
};

declare class Promotion {
    hit: PromotionType;
    static ACTION_CLICK: 'click';
    static ACTION_VIEW: 'view';
    constructor();
    /**
     * 设置促销ID
     * */
    setId(id: string | number): Promotion;
    /**
     * 设置促销名称
     * */
    setName(name: string): Promotion;
    /**
     * 设置促销素材
     * */
    setCreative(creative: string): Promotion;
    /**
     * 设置促销位置
     * */
    setPosition(positionName: string): Promotion;
}
interface PromotionType {
    id?: string;
    nm?: string;
    cr?: string;
    ps?: string;
}

declare class Product {
    hit: ProductType | any;
    constructor();
    /**
     * 设置产品SKU
     * */
    setId(id: string | number): Product;
    /**
     * 设置产品品牌
     * */
    setBrand(brand: string): Product;
    /**
     * 设置产品名称
     * */
    setName(name: string): Product;
    /**
     * 设置产品分类
     * */
    setCategory(category: string): Product;
    /**
     * 设置产品优惠券代码
     * */
    setCouponCode(couponCode: string): Product;
    /**
     * 设置产品价格
     * */
    setPrice(price: number): Product;
    /**
     * 设置产品数量
     * */
    setQuantity(quantity: number): Product;
    /**
     * 产品在列表中的位置 1-200
     * */
    setPosition(position: number): Product;
    /**
     * 产品款式
     * */
    setVariant(variant: string): Product;
    /**
     * 设置产品自定义维度
     * */
    setCustomDimension(index: number, value: string): Product;
    /**
     * 设置产品自定义指标
     * */
    setCustomMetric(index: number, value: string): Product;
}
interface ProductType {
    id?: string;
    br?: string;
    nm?: string;
    ca?: string;
    cc?: string;
    pr?: number;
    qt?: number;
    ps?: number;
    va?: string;
}

declare class ProductAction {
    hit: HitType;
    static ACTION_DETAIL: 'detail';
    static ACTION_CLICK: 'click';
    static ACTION_ADD: 'add';
    static ACTION_REMOVE: 'remove';
    static ACTION_CHECKOUT: 'checkout';
    static ACTION_CHECKOUT_OPTION: 'checkout_option';
    static ACTION_PURCHASE: 'purchase';
    static ACTION_REFUND: 'refund';
    constructor(action: 'detail' | 'click' | 'add' | 'remove' | 'checkout' | 'checkout_option' | 'purchase' | 'refund');
    /**
     * 设置结帐步骤
     * */
    setCheckoutStep(step: number): ProductAction;
    /**
     * 设置结帐步骤选项
     * */
    setCheckoutOptions(option: string): ProductAction;
    /**
     * 设置产品操作列表
     * 发生产品操作的列表或集合。这是一个可以在“产品操作”设置为“detail”或“click”时发送的附加参数
     * */
    setProductActionList(productActionList: string): ProductAction;
    /**
     * 产品列表来源
     * NOTE: 查不到协议字段名,但是Android SDK中查到是pls
     * */
    setProductListSource(productListSource: string): ProductAction;
    /**
     * 设置交易使用的优惠券代码
     * */
    setTransactionCouponCode(transactionCouponCode: string): ProductAction;
    /**
     * 设置交易id
     * */
    setTransactionId(transactionId: string): ProductAction;
    /**
     * 设置交易关联公司
     * */
    setTransactionAffiliation(transactionAffiliation: string): ProductAction;
    /**
     * 设置交易收入
     * 指总收入：此值应包含所有运费或税费。
     * */
    setTransactionRevenue(revenue: number): ProductAction;
    /**
     * 设置交易运费
     * */
    setTransactionShipping(shipping: number): ProductAction;
    /**
     * 设置交易税费
     * */
    setTransactionTax(tax: number): ProductAction;
}

declare class HitBuilder {
    hit: HitType | any;
    custom_dimensions: Array<[number, string]>;
    custom_metrics: Array<[number, string]>;
    next_impression_index: number;
    impression_product_list: any;
    next_product_index: number;
    next_promotion_index: number;
    constructor();
    /**
     * 获取对应参数
     * */
    get(paramName: string): string | number | undefined;
    /**
     * 设置参数
     * */
    set(paramName: string, paramValue: string | number): HitBuilder;
    /**
     * 设置全部参数
     * */
    setAll(params: HitType | any): this;
    /**
     * 添加列表商品
     * */
    addImpression(product: Product, impressionList: string): HitBuilder;
    /**
     * 添加商品
     * */
    addProduct(product: Product): HitBuilder;
    /**
     * 添加促销活动
     * */
    addPromotion(promotion: Promotion | any): HitBuilder;
    /**
     * 设置商品操作
     * */
    setProductAction(productAction: ProductAction | any): HitBuilder;
    /**
     * 设置促销操作
     * */
    setPromotionAction(action: 'click' | 'view'): HitBuilder;
    /**
     * 设置渠道
     * */
    setCampaignParamsFromUrl(url: string): this;
    /**
     * 设置自定义维度
     * */
    setCustomDimension(index: number, dimension: string): this;
    /**
     * 设置自定义指标
     * */
    setCustomMetric(index: number, metric: string): this;
    /**
     * 新开一个会话
     * */
    setNewSession(): this;
    /**
     * 结束会话
     * */
    setEndSession(): this;
    /**
     * 设置非互动匹配
     * */
    setNonInteraction(nonInteraction: boolean): this;
    /**
     * 设置匹配类型
     * 必须是“pageview”、“screenview”、“event”、“transaction”、“item”、“social”、“exception”、“timing”中的一个
     * */
    setHitType(hitType: 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing'): void;
    build(): HitType;
}

declare class ScreenViewBuilder extends HitBuilder {
    constructor();
}

declare class EventBuilder extends HitBuilder {
    constructor();
    /**
     * 设置事件类别
     * */
    setCategory(category: string): EventBuilder;
    /**
     * 设置事件动作
     * */
    setAction(action: string): EventBuilder;
    /**
     * 设置事件标签
     * */
    setLabel(label?: string): EventBuilder;
    /**
     * 设置事件值
     * */
    setValue(value?: number): EventBuilder;
    build(): HitType;
}

declare class SocialBuilder extends HitBuilder {
    constructor();
    /**
     * 设置社交网络
     * */
    setNetWork(network: string): SocialBuilder;
    /**
     * 设置社交操作
     * */
    setAction(action: string): SocialBuilder;
    /**
     * 设置社交目标
     * */
    setTarget(target: string): SocialBuilder;
}

declare class ExceptionBuilder extends HitBuilder {
    constructor();
    setDescription(description: string): ExceptionBuilder;
    setFatal(isFatal: any): ExceptionBuilder;
}

declare class TimingBuilder extends HitBuilder {
    constructor();
    /**
     * 设置用户计时类别
     * */
    setCategory(category: string): TimingBuilder;
    /**
     * 设置用户计时变量名称
     * */
    setVariable(variable: string): TimingBuilder;
    /**
     * 设置用户计时时间(毫秒)
     * */
    setValue(value: number): TimingBuilder;
    /**
     * 设置用户计时标签
     * */
    setLabel(label?: string): TimingBuilder;
    /**
     * 设置页面加载时间(毫秒)
     * */
    setPageLoadTime(pageLoadTime?: number): TimingBuilder;
    /**
     * 设置DNS时间(毫秒)
     * */
    setDNSTime(dnsTime?: number): TimingBuilder;
    /**
     * 设置页面下载时间(毫秒)
     * */
    setPageDownloadTime(pageDownloadTime?: number): TimingBuilder;
    /**
     * 设置重定向响应时间(毫秒)
     * */
    setRedirectResponseTime(redirectResponseTime?: number): TimingBuilder;
    /**
     * 设置tcp连接时间(毫秒)
     * */
    setTCPConnectTime(tcpConnectTime?: number): TimingBuilder;
    /**
     * 设置服务器响应时间(毫秒)
     * */
    setServerResponseTime(serverResponseTime?: number): TimingBuilder;
    /**
     * 设置DOM互动时间(毫秒)
     * */
    setDocumentInteractiveTime(documentInteractiveTime?: number): TimingBuilder;
    /**
     * 设置内容加载时间(毫秒)
     * */
    setContentLoadedTime(contentLoadedTime?: number): TimingBuilder;
    build(): HitType;
}

declare class CampaignParams {
    params: any;
    params_map: Object;
    constructor();
    /**
     * 设置参数
     * */
    set(paramName: string, paramValue: string): CampaignParams;
    /**
     * 转换成广告推广连接,形式： https://example.com?utm_XXXX=xxxx&utm_YYYY=yyyy
     * */
    toUrl(url: string, otherQuery?: any): string;
    /**
     * 通过页面参数解析
     * */
    static parseFromPageOptions(options?: any, map?: any): CampaignParams;
    /**
     * 通过url参数解析
     * */
    static parseFromUrl(url: string): CampaignParams;
    /**
     * 微信小程序场景值
     * */
    static buildFromWxAppScene(scene: number): CampaignParams;
}

declare function getInstance(app?: any): any;
declare const _default: {
    GoogleAnalytics: {
        getInstance: typeof getInstance;
    };
    HitBuilders: {
        HitBuilder: typeof HitBuilder;
        ScreenViewBuilder: typeof ScreenViewBuilder;
        EventBuilder: typeof EventBuilder;
        SocialBuilder: typeof SocialBuilder;
        ExceptionBuilder: typeof ExceptionBuilder;
        TimingBuilder: typeof TimingBuilder;
    };
    Product: typeof Product;
    ProductAction: typeof ProductAction;
    Promotion: typeof Promotion;
    CampaignParams: typeof CampaignParams;
};

export default _default;
