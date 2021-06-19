import {HitType} from "../../type";

export default class ProductAction {
    hit: HitType;

    static ACTION_DETAIL = 'detail';
    static ACTION_CLICK = 'click';
    static ACTION_ADD = 'add';
    static ACTION_REMOVE = 'remove';
    static ACTION_CHECKOUT = 'checkout';
    static ACTION_CHECKOUT_OPTION = 'checkout_option';
    static ACTION_PURCHASE = 'purchase';
    static ACTION_REFUND = 'refund';


    constructor(action : 'detail'|'click'|'add'|'remove'|'checkout'|'checkout_option'|'purchase'|'refund') {
        this.hit = {
            pa: action
        }
    }

    /**
     * 设置结帐步骤
     * */
    setCheckoutStep(step : number): ProductAction {
        this.hit['cos'] = step;
        return this;
    }

    /**
     * 设置结帐步骤选项
     * */
    setCheckoutOptions(option : string): ProductAction {
        this.hit['col'] = option;
        return this;
    }

    /**
     * 设置产品操作列表
     * 发生产品操作的列表或集合。这是一个可以在“产品操作”设置为“detail”或“click”时发送的附加参数
     * */
    setProductActionList(productActionList : string): ProductAction {
        this.hit['pal'] = productActionList;
        return this;
    }

    /**
     * 产品列表来源
     * NOTE: 查不到协议字段名,但是Android SDK中查到是pls
     * */
    setProductListSource(productListSource : string): ProductAction {
        this.hit["pls"] = productListSource;
        return this;
    }

    /**
     * 设置交易使用的优惠券代码
     * */
    setTransactionCouponCode(transactionCouponCode : string): ProductAction {
        this.hit["tcc"] = transactionCouponCode;
        return this;
    }

    /**
     * 设置交易id
     * */
    setTransactionId(transactionId : string): ProductAction {
        this.hit["ti"] = transactionId;
        return this;
    }

    /**
     * 设置交易关联公司
     * */
    setTransactionAffiliation(transactionAffiliation : string): ProductAction {
        this.hit["ta"] = transactionAffiliation;
        return this;
    }

    /**
     * 设置交易收入
     * 指总收入：此值应包含所有运费或税费。
     * */
    setTransactionRevenue(revenue : number): ProductAction {
        this.hit["tr"] = revenue;
        return this;
    }

    /**
     * 设置交易运费
     * */
    setTransactionShipping(shipping : number): ProductAction {
        this.hit["ts"] = shipping;
        return this;
    }

    /**
     * 设置交易税费
     * */
    setTransactionTax(tax : number): ProductAction {
        this.hit["tt"] = tax;
        return this;
    }
}