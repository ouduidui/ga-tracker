import HitBuilder from "../core/HitBuilder";

// 社交上报
export default class SocialBuilder extends HitBuilder {
    constructor() {
        super();
        this.setHitType('social');
        this.setAll({
            sn: '',
            sa: '',
            st: ''
        } as SocialType)
    }

    /**
     * 设置社交网络
     * */
    setNetWork(network: string):SocialBuilder {
        return <SocialBuilder>this.set('sn', network);
    }

    /**
     * 设置社交操作
     * */
    setAction(action: string):SocialBuilder {
        return <SocialBuilder>this.set('sa', action);
    }

    /**
     * 设置社交目标
     * */
    setTarget(target: string):SocialBuilder {
        return <SocialBuilder>this.set('st', target);
    }
}

interface SocialType {
    sn : string;
    sa : string;
    st : string;
}