import {HitType} from "../type";
import {hit_param_fix, parseUtmParams} from "../utils";
import Promotion from "../ecommerce/Promotion";
import Product from "../ecommerce/Product";

export default class HitBuilder {
    hit: HitType | any;
    custom_dimensions: Array<[number, string]>;
    custom_metrics: Array<[number, string]>;
    next_impression_index: number;
    impression_product_list: any;
    next_product_index: number;
    next_promotion_index: number;

    constructor() {
        this.hit = {
            t: 'screenview',
            ni: 0
        };
        this.custom_dimensions = [];
        this.custom_metrics = [];

        this.next_impression_index = 1; // max 200
        this.impression_product_list = {};
        this.next_product_index = 1; // max 200
        this.next_promotion_index = 1; // max 200
    }

    /**
     * 获取对应参数
     * */
    get(paramName: string): string | number | undefined {
        return this.hit[hit_param_fix(paramName)];
    }

    /**
     * 设置参数
     * */
    set(paramName: string, paramValue: string | number): HitBuilder {
        this.hit[hit_param_fix(paramName)] = paramValue;
        return this;
    }

    /**
     * 设置全部参数
     * */
    setAll(params: HitType | any) {
        for (const k in params) {
            this.set(k, params[k]);
        }
        return this;
    }

    /**
     * 添加列表商品
     * */
    addImpression(product: Product, impressionList: string): HitBuilder {
        if (!this.impression_product_list[impressionList]) {
            this.impression_product_list[impressionList] = [this.next_impression_index, 1];
            // 产品展示列表名称
            // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#il_nm
            this.set('il' + this.next_impression_index + "nm", impressionList);
            this.next_impression_index++;
        }

        const listIndex: number = this.impression_product_list[impressionList][0];
        const productIndex: number = this.impression_product_list[impressionList][1];

        for (const k in product.hit) {
            // 产品展示详情
            // 产品展示 SKU -> il<listIndex>pi<productIndex>id
            // 产品展示名称 -> il<listIndex>pi<productIndex>nm
            // 产品展示品牌 -> il<listIndex>pi<productIndex>br
            // 产品展示类别 -> il<listIndex>pi<productIndex>ca
            // 产品展示款式 -> il<listIndex>pi<productIndex>va
            // 产品展示位置 -> il<listIndex>pi<productIndex>ps
            // 产品展示价格 -> il<listIndex>pi<productIndex>pr
            this.set("il" + listIndex + "pi" + productIndex + k, product.hit[k]);
        }

        this.impression_product_list[impressionList][1] = productIndex + 1;

        return this;
    }

    /**
     * 添加商品
     * */
    addProduct(product: Product): HitBuilder {
        const productIndex = this.next_product_index;

        for (const k in product.hit) {
            // 产品详情
            // 产品 SKU -> pr<productIndex>id
            // 产品名称 -> pr<productIndex>nm
            // 产品品牌 -> pr<productIndex>br
            // 产品类别 -> pr<productIndex>ca
            // 产品款式 -> pr<productIndex>va
            // 产品数量 -> pr<productIndex>qt
            // 产品价格 -> pr<productIndex>pr
            // 产品优惠券代码 -> pr<productIndex>cc
            // 产品位置 -> pr<productIndex>ps
            this.set("pr" + productIndex + k, product.hit[k]);
        }

        this.next_product_index++;
        return this;
    }

    /**
     * 添加促销活动
     * */
    addPromotion(promotion: Promotion | any): HitBuilder {
        const promotionIndex = this.next_promotion_index;

        for (const k in promotion.hit) {
            // 促销ID -> promo<promoIndex>id
            // 促销名称 -> promo<promoIndex>nm
            // 促销广告素材 -> promo<promoIndex>cr
            // 促销位置 -> promo<promoIndex>ps
            this.set("promo" + promotionIndex + k, promotion.hit[k]);
        }

        this.next_promotion_index++;
        return this;
    }

    /**
     * 设置促销操作
     * */
    setPromotionAction(action: string): HitBuilder {
        return this.set("promoa", action);
    }

    /**
     * 设置渠道
     * */
    setCampaignParamsFromUrl(url: string) {
        const hit: HitType = parseUtmParams(url);
        return this.setAll(hit);
    }

    /**
     * 设置自定义维度
     * */
    setCustomDimension(index: number, dimension: string) {
        this.custom_dimensions.push([index, dimension]);
        return this;
    }

    /**
     * 设置自定义指标
     * */
    setCustomMetric(index: number, metric: string) {
        this.custom_metrics.push([index, metric]);
        return this;
    }

    /**
     * 新开一个会话
     * */
    setNewSession() {
        this.hit.sc = 'start';
        return this;
    }

    /**
     * 结束会话
     * */
    setEndSession() {
        this.hit.sc = 'end';
        return this;
    }

    /**
     * 设置非互动匹配
     * */
    setNonInteraction(nonInteraction: boolean) {
        this.hit.ni = nonInteraction ? 1 : 0;
        return this;
    }

    /**
     * 设置匹配类型
     * 必须是“pageview”、“screenview”、“event”、“transaction”、“item”、“social”、“exception”、“timing”中的一个
     * */
    setHitType(hitType: 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing') {
        this.hit.t = hitType;
    }

    build(): HitType {
        const del_keys:Array<string> = [];  // 需要删除的无效字段

        if(this.hit.ni === 0) {
            del_keys.push('ni');
        }

        // 清除旧的自定义维度cd<index>,自定义指标cm<index>
        for(const k in this.hit) {
            if (k.match(/^(cd|cm)\d+$/)) {
                del_keys.push(k);
            }
        }

        // 删除无效字段
        del_keys.forEach((k) => {
            delete this.hit[k];
        })

        // 处理自定义维度和指标
        const cd_arr: Array<[number, string]> = this.custom_dimensions;
        const cm_arr: Array<[number, string]> = this.custom_metrics;

        cd_arr.forEach(cd => {
            this.hit['cd' + cd[0]] = cd[1];
        })

        cm_arr.forEach(cm => {
            this.hit['cm' + cm[0]] = cm[1];
        })

        return this.hit;
    }
}