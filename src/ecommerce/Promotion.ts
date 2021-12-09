// 活动促销
export default class Promotion {
    hit: PromotionType;

    static ACTION_CLICK: 'click' = 'click';
    static ACTION_VIEW: 'view' = 'view';

    constructor() {
        this.hit = {};
    }

    /**
     * 设置促销ID
     * */
    setId(id: string | number): Promotion {
        this.hit['id'] = String(id);
        return this;
    }

    /**
     * 设置促销名称
     * */
    setName(name: string): Promotion {
        this.hit['nm'] = name;
        return this;
    }

    /**
     * 设置促销素材
     * */
    setCreative(creative: string): Promotion {
        this.hit['cr'] = creative;
        return this;
    }

    /**
     * 设置促销位置
     * */
    setPosition(positionName: string): Promotion {
        this.hit['ps'] = positionName;
        return this;
    }
}

interface PromotionType {
    id?: string;   // 促销ID
    nm?: string;   // 促销名称
    cr?: string;   // 促销素材
    ps?: string;   // 促销位置
}