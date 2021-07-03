import wxScene from "../utils/wxScene";

export default class CampaignParams {
    params: any;
    params_map: Object;

    constructor() {
        this.params = {};
        this.params_map = {
            "utm_source": "cs",  // 广告来源
            "utm_medium": "cm",  // 广告媒介
            "utm_term": "ck",   // 广告关键字
            "utm_content": "cc",   // 广告内容
            "utm_campaign": "cn",   // 广告名称
            "gclid": "gclid",  // Google Ads ID
            "dclid": "dclid"   // Google 展示广告 ID
        };
    }

    /**
     * 设置参数
     * */
    set(paramName: string, paramValue: string): CampaignParams {
        if (paramName in this.params_map) {
            this.params[paramName] = paramValue;
        }
        return this;
    }

    /**
     * 转换成广告推广连接,形式： https://example.com?utm_XXXX=xxxx&utm_YYYY=yyyy
     * */
    toUrl(url: string, otherQuery: any = {}) {
        const kv = [];
        for (const k1 in otherQuery) {
            kv.push([encodeURIComponent(k1), encodeURIComponent(this.params[k1])].join('='));
        }
        for (const k2 in this.params) {
            kv.push([encodeURIComponent(k2), encodeURIComponent(this.params[k2])].join('='));
        }

        return url + '?' + kv.join('&');
    }

    /**
     * 通过页面参数解析
     * */
    static parseFromPageOptions(options: any = {}, map: any = {}): CampaignParams {
        const cp = new CampaignParams();

        for (let k in options) {
            const v = options[k];

            // 从映射表获取对应值
            if (k in map) {
                k = map[k];
            }

            // 判断是否广告系列参数
            if (k.match(/^utm_/) || k == "gclid" || k == "dclid") {
                cp.set(k, v);
            }
        }

        return cp;
    }

    /**
     * 通过url参数解析
     * */
    static parseFromUrl(url: string) {
        const queryString = url.replace(/^[^?]+\?/, '');
        const cp: CampaignParams = new CampaignParams();
        const map: any = cp.params_map;

        queryString.split('&').map(function (a) {
            const kv: Array<string> = a.split('=');
            const k: string = decodeURIComponent(kv[0]);
            if (kv.length != 2 || kv[1] === "" || !map[k]) return;
            const v = decodeURIComponent(kv[1]);
            cp.set(k, v);
        });

        return cp;
    }

    /**
     * 微信小程序场景值
     * */
    static buildFromWxAppScene(scene: number) {
        const wxSceneMap: Map<number, string> = wxScene;

        const cp: CampaignParams = new CampaignParams();

        const v = wxSceneMap.get(scene);

        if (v) {
            cp.set('utm_source', '小程序场景');
            cp.set('utm_medium', scene + ':' + v);
        } else {
            cp.set('utm_source', '小程序场景');
            cp.set('utm_medium', scene + '');
        }

        return cp;
    }
}