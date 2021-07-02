// 产品信息
export default class Product {
    hit: ProductType | any;

    constructor() {
        this.hit = {};
    }

    /**
     * 设置产品SKU
     * */
    setId(id: string | number): Product {
        this.hit['id'] = String(id);
        return this;
    }

    /**
     * 设置产品品牌
     * */
    setBrand(brand: string): Product {
        this.hit['br'] = brand;
        return this;
    }

    /**
     * 设置产品名称
     * */
    setName(name: string): Product {
        this.hit['nm'] = String(name);
        return this;
    }

    /**
     * 设置产品分类
     * */
    setCategory(category: string): Product {
        this.hit["ca"] = category;
        return this;
    }

    /**
     * 设置产品优惠券代码
     * */
    setCouponCode(couponCode: string): Product {
        this.hit["cc"] = couponCode;
        return this;
    }

    /**
     * 设置产品价格
     * */
    setPrice(price: number): Product {
        this.hit["pr"] = price;
        return this;
    }

    /**
     * 设置产品数量
     * */
    setQuantity(quantity: number): Product {
        this.hit["qt"] = quantity;
        return this;
    }

    /**
     * 产品在列表中的位置 1-200
     * */
    setPosition(position: number): Product {
        this.hit["ps"] = position;
        return this;
    }

    /**
     * 产品款式
     * */
    setVariant(variant: string): Product {
        this.hit["va"] = variant;
        return this;
    }

    /**
     * 设置产品自定义维度
     * */
    setCustomDimension(index: number, value: string): Product {
        this.hit["cd" + index] = value;
        return this;
    }

    /**
     * 设置产品自定义指标
     * */
    setCustomMetric(index: number, value: string): Product {
        this.hit["cm" + index] = value;
        return this;
    }
}

interface ProductType {
    // 产品SKU
    id?: string;
    // 产品品牌
    br?: string;
    // 产品名称
    nm?: string;
    // 产品分类
    ca?: string;
    // 产品优惠券代码
    cc?: string;
    // 产品价格
    pr?: number;
    // 产品数量
    qt?: number;
    // 产品位置
    ps?: number;
    // 商品款式
    va?: string;
}