<template>
    <view class="content">
        <button class="btn" @tap="trackEvent">事件上报</button>
        <button class="btn" @tap="trackException">异常上报</button>
        <button class="btn" @tap="trackTiming">用户计时上报</button>
        <button class="btn" @tap="startNewSession">开始一个新的会话</button>

        <button class="btn" @tap="trackProductShow">产品展示上报</button>
        <button class="btn" @tap="trackProductAction">产品操作上报</button>
        <button class="btn" @tap="trackProductShowAndAction">产品展示上报</button>
        <button class="btn" @tap="trackProductAddCart">产品加入购物车上报</button>
        <button class="btn" @tap="trackProductPurchase">产品交易上报</button>
        <button class="btn" @tap="trackProductRefund">产品退款上报</button>
        <button class="btn" @tap="trackSomeProductRefund">部分产品退款上报</button>
        <button class="btn" @tap="trackRefundNonInteraction">退款使用非互动事件</button>
        <button class="btn" @tap="trackPromotionShow">促销信息展示</button>
        <button class="btn" @tap="trackPromotionClick">促销信息点击</button>
    </view>
</template>

<script>
import {HitBuilders, Product, ProductAction, Promotion, CampaignParams} from "../../../../../dist/ga";

export default {
    onLoad(options) {
        const map = {
            "var1" : "utm_source", // 把 var1 对应到  utm_source
            "var2" : "utm_medium"
        };
        // 解析options中的 utm_xxxxxx 参数，生成一个广告连接 URL
        const campaignUrl = CampaignParams.parseFromPageOptions(options, map).toUrl();
        this.$gaTracker.setCampaignParamsOnNextHit(campaignUrl);

        // 下一个发送的匹配就会带上广告来源信息
        // t.send(Hit)
    },
    onShow() {
        // 后续的所有匹配数据都会使用这个屏幕名称
        this.$gaTracker.setScreenName('首页');

        // 上报
        this.$gaTracker.send(new HitBuilders.ScreenViewBuilder().build());
    },
    methods: {
        // 事件上报
        trackEvent() {
            this.$gaTracker.send(new HitBuilders.EventBuilder()
                .setCategory('按钮')  // 事件类别
                .setAction('点击')   // 事件动作
                .setLabel('上报') // 事件标签 可选
                .setValue(1)   // 事件值 可选
                .build());
        },

        // 异常上报
        trackException() {
            this.$gaTracker.send(new HitBuilders.ExceptionBuilder()
                .setDescription('异常描述信息')
                .setFatal(false).build()); // 可选，是否严重错误，默认为 true
        },

        // 用户计时上报
        trackTiming() {
            this.$gaTracker.send(new HitBuilders.TimingBuilder()
                .setCategory('计时器')
                .setValue(63000)
                .setVariable('用户注册')
                .setLabel('表单').build());
        },

        // 开始一个新会话
        startNewSession() {
            this.$gaTracker.send(new HitBuilders.ScreenViewBuilder()
                .setNewSession()
                .build());
        },

        // 衡量展示
        trackProductShow() {
            // 在一个 "Search Results" 的列表中展示了商品 P12345
            const product = new Product()
                .setId("P12345")  // id
                .setName("Android Warhol T-Shirt")   // 名称
                .setCategory("Apparel/T-Shirts") // 分类
                .setBrand("Google") // 品牌
                .setVariant("Black") // 款式
                .setPosition(1) // 在列表中位置
                .setCustomDimension(1, "Member"); // 产品范围的自定义维度#1
            const builder = new HitBuilders.ScreenViewBuilder()
                .addImpression(product, "Search Results");
            // .addImpression(product2, "Search Results")   // 在同一个列表中可以加入更多商品
            // .addImpression(product3, "Search Results2")   // 也可以加入更多列表

            this.$gaTracker.setScreenName("searchResults")
                .send(builder.build());
        },

        // 衡量操作
        trackProductAction() {
            const product = new Product()
                .setId("P12345")  // id
                .setName("Android Warhol T-Shirt")   // 名称
                .setCategory("Apparel/T-Shirts") // 分类
                .setBrand("Google") // 品牌
                .setVariant("Black") // 款式
                .setPosition(1) // 在列表中位置
                .setCustomDimension(1, "Member"); // 产品范围的自定义维度#1

            const productAction = new ProductAction(ProductAction.ACTION_CLICK)  // 商品点击
                .setProductActionList("Search Results");

            const builder = new HitBuilders.ScreenViewBuilder()
                .addProduct(product)
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("searchResults")
                .send(builder.build());
        },

        // 同时衡量展示和操作
        trackProductShowAndAction() {
            const relatedProduct = new Product()
                .setId("P12346")
                .setName("Android Warhol T-Shirt")
                .setCategory("Apparel/T-Shirts")
                .setBrand("Google")
                .setVariant("White")
                .setPosition(1);

            const viewedProduct = new Product()
                .setId("P12345")
                .setName("Android Warhol T-Shirt")
                .setCategory("Apparel/T-Shirts")
                .setBrand("Google")
                .setVariant("Black")
                .setPosition(1);

            const productAction = new ProductAction(ProductAction.ACTION_DETAIL);

            const builder = new HitBuilders.ScreenViewBuilder()
                .addImpression(relatedProduct, "Related Products")
                .addProduct(viewedProduct)
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("product")
                .send(builder.build());
        },

        // 上报加入购物车
        trackProductAddCart() {
            const product = new Product()
                .setId("P12345"); // Id或者Name其中一个必须设置
            const productAction = new ProductAction(ProductAction.ACTION_ADD);
            const builder = new HitBuilders.ScreenViewBuilder()
                .addProduct(product)
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("transaction")
                .send(builder.build());
        },

        // 上报加入交易
        trackProductPurchase() {
            const product = new Product()
                .setId("P12345")
                .setName("Android Warhol T-Shirt")
                .setCategory("Apparel/T-Shirts")
                .setBrand("Google")
                .setVariant("Black")
                .setPrice(29.20)
                .setCouponCode("APPARELSALE")
                .setQuantity(1);
            const productAction = new ProductAction(ProductAction.ACTION_PURCHASE)
                .setTransactionId("T12345")  // 订单id
                .setTransactionAffiliation("Google Store - Online")  // 交易关联公司
                .setTransactionRevenue(37.39) // 【重要】这个是订单总价，包含了 税费 和 运费
                .setTransactionTax(2.85)  // 税费
                .setTransactionShipping(5.34)   // 邮费
                .setTransactionCouponCode("SUMMER2013");  // 优惠券编号
            const builder = new HitBuilders.ScreenViewBuilder()
                .addProduct(product)
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("transaction")
                .send(builder.build());
        },

        // 上报退款
        trackProductRefund() {
            const productAction = new ProductAction(ProductAction.ACTION_REFUND)
                .setTransactionId("T12345");  // 订单号
            const builder = new HitBuilders.ScreenViewBuilder()
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("refund")
                .send(builder.build());
        },

        // 退款部分商品
        trackSomeProductRefund() {
            const product = new Product()
                .setId("P12345")  // 退款的商品id
                .setPrice(20.23) // 退款时可以不是原价退还
                .setQuantity(1);  // 退款的数量
            const productAction = new ProductAction(ProductAction.ACTION_REFUND)
                .setTransactionId("T12345");  // 退款单号
            const builder = new HitBuilders.ScreenViewBuilder()
                .addProduct(product)
                .setProductAction(productAction);

            this.$gaTracker.setScreenName("refundProduct")
                .send(builder.build());
        },

        // 退款使用非互动事件
        trackRefundNonInteraction() {
            const productAction = new ProductAction(ProductAction.ACTION_REFUND)
                .setTransactionId("T12345");
            const builder = new HitBuilders.EventBuilder()
                .setProductAction(productAction)
                .setNonInteraction(true) // 设置非互动事件
                .setCategory("Ecommerce")
                .setAction("Refund");

            this.$gaTracker.send(builder.build());
        },

        // 促销信息展示
        trackPromotionShow() {
            const promotion = new Promotion()
                .setId("PROMO_1234")  // 促销id
                .setName("Summer Sale")  // 促销名称
                .setCreative("summer_banner2")  // 促销素材
                .setPosition("banner_slot1");  // 促销位置

            const builder = new HitBuilders.ScreenViewBuilder()
                .addPromotion(promotion);

            this.$gaTracker.setScreenName("promotions")
                .send(builder.build());
        },

        // 促销信息点击
        trackPromotionClick() {
            const promotion = new Promotion()
                .setId("PROMO_1234")
                .setName("Summer Sale")
                .setCreative("summer_banner2")
                .setPosition("banner_slot1");

            const builder = new HitBuilders.EventBuilder()
                .setCategory("Internal Promotions")
                .setAction("click")
                .setLabel("Summer Sale")
                .addPromotion(promotion)
                .setPromotionAction(Promotion.ACTION_CLICK)  // 促销动作

            this.$gaTracker.send(builder.build());
        }
    }
}
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.btn {
    margin-top: 20px;
    background: #333;
    color: #fff;
    border-radius: 5px;
    padding: 0 40px;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
}
</style>