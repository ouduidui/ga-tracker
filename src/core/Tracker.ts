import GoogleAnalytics from "./GoogleAnalytics";
import {hit_param_fix, parseUtmParams, request} from "../utils";
import {HitType} from "../type";

export default class Tracker {
    ga: GoogleAnalytics;
    hit: HitType | any;
    trackerServer: string;
    next_hit: HitType | any;
    sending: boolean;
    send_queue: Array<[HitType, Date]>;


    constructor(ga: GoogleAnalytics, tid: string) {
        this.ga = ga;
        this.hit = {
            tid: tid,
            cd: "" // screenName
        };
        this.trackerServer = "https://www.google-analytics.com";
        this.next_hit = {};   // 下一个hit需要设置的参数

        this.sending = false;   //数据发送状态
        this.send_queue = [];   //发送队列
    }

    /**
     * 设置自定义的跟踪服务器地址，默认是 https://www.google-analytics.com
     * */
    setTrackerServer(server: string) :Tracker{
        this.trackerServer = server;
        return this;
    }

    /**
     * 获取对应参数
     * */
    get(key: string): string | number | undefined {
        return this.hit[hit_param_fix(key)];
    }

    /**
     * 设置参数
     * */
    set(key: string, value: string | number) : Tracker {
        this.hit[hit_param_fix(key)] = value;
        return this;
    }

    /**
     * 对 IP 地址进行匿名处理
     * */
    setAnonymizeIp(anonymize: boolean): Tracker {
        return this.set("aip", anonymize ? 1 : 0);
    }

    /**
     * 设置应用ID
     * */
    setAppId(appId: string): Tracker {
        return this.set("aid", appId)
    }

    /**
     * 设置应用安装程序ID
     * */
    setAppInstallerId(appInstallerId: string): Tracker {
        return this.set("aiid", appInstallerId)
    }

    /**
     * 设置应用名称
     * */
    setAppName(appName: string): Tracker {
        return this.set("an", appName);
    }

    /**
     * 设置应用名称
     * */
    setAppVersion(appVersion: string) : Tracker{
        return this.set("av", appVersion);
    }

    /**
     * 为下个hit设置utm
     * */
    setCampaignParamsOnNextHit(uri:string) :Tracker {
        const hit:any = parseUtmParams(uri);
        this.next_hit = {};
        for (const k in hit) {
            this.next_hit[k] = hit[k];
        }
        return this;
    }

    /**
     * 设置客户端ID
     * */
    setClientId(clientId: string): Tracker {
        return this.set("cid", clientId);
    }

    /**
     * 设置用户 ID
     * */
    setUserId(userId: string): Tracker {
        return this.set("uid", userId);
    }

    /**
     * 设置文档编码
     * */
    setEncoding(encoding: string): Tracker {
        return this.set("de", encoding);
    }

    /**
     * 设置用户语言
     * */
    setLanguage(language: string): Tracker {
        return this.set("ul", language);
    }

    /**
     * 地理位置替换
     * */
    setLocation(location: string): Tracker {
        return this.set("geoid", location);
    }

    /**
     * 设置屏幕颜色
     * */
    setScreenColors(screenColors: string): Tracker {
        return this.set("sd", screenColors);
    }

    /**
     * 设置屏幕名称
     * */
    setScreenName(screenName: string): Tracker {
        return this.set("cd", screenName);
    }

    /**
     * 设置视口大小
     * */
    setViewportSize(viewportSize: string): Tracker {
        return this.set("vp", viewportSize);
    }

    /**
     * 发送请求
     * */
    send(hit: HitType): Tracker {
        this.send_queue_push(this.ga, hit);
        return this;
    }

    /**
     * 处理发送队列
     * 小程序最多只有5个并发网络请求，使用队列方式尽量不过多占用请求
     * */
    send_queue_push(ga: GoogleAnalytics, hit: HitType | any) {
        // 默认基础字段
        const data: HitType | any = {
            v: 1,
            cid: ga.cid,
            ds: "app",
            ul: ga.systemInfo.language,
            de: "UTF-8",
            sd: "24-bit",
            je: 0,
            an: ga.appName,
            av: ga.appVersion,
            vp: ga.vp,
        };

        // 合并Tracker上的参数
        for (const k1 in this.hit) {
            data[k1] = this.hit[k1];
        }
        // Tracker上有预设的单次发送数据
        for (const k2 in this.next_hit) {
            data[k2] = this.next_hit[k2];
        }
        this.next_hit = {};

        // 合并Builder上的参数
        for (const k3 in hit) {
            data[k3] = hit[k3];
        }

        // 打印发送数据
        this.ga.log && console.log(["ga.queue.push", data]);

        this.send_queue.push([data, new Date()]);

        this._do_send();
    }

    /**
     * 发送动作
     * */
    _do_send() {
        if(this.sending) return;

        if(!this.send_queue.length){
            this.sending = false;
            return;
        }

        this.sending = true;
        const self = this;

        // 拼接query
        const payloadEncoder = (data: HitType | any) => {
            const s = [];
            for(const k in data) {
                s.push([encodeURIComponent(k), encodeURIComponent(data[k])].join('='));
            }
            return s.join("&");
        }

        const payloads:Array<string> = [];
        while (this.send_queue.length) {
            const sd:[HitType, Date] = this.send_queue[0];
            const data: HitType = sd[0];
            data.qt = (new Date()).getTime() - sd[1].getTime(); // 数据发生和发送的时间差，单位毫秒
            data.z = Math.floor(Math.random() * 289372387); // 发送一个随机数，确保浏览器和代理服务器不对匹配进行缓存

            const payload: string = payloadEncoder(data);
            const old_len: number = payloads.map(a => a.length).reduce((a, b) => a + b, 0);
            const add_len: number = payload.length;

            // 批量上报有限制
            // 1. 单条8K
            // 2. 总共16K
            // 3. 最多20条
            if (old_len + add_len > 16 * 1024 || add_len > 8 * 1024 || payloads.length >= 20) {
                // 但是要保证至少有单次上报的数据
                if (payloads.length) break;
            }

            payloads.push(payload);
            this.send_queue.shift();

            this.ga.log && console.log(["ga.queue.presend[" + (payloads.length - 1) + "]", data]);
        }

        const payloadData:string = payloads.join("\r\n");
        let apiUrl:string = this.trackerServer + '/collect';

        if(payloads.length > 1){
            this.ga.log && console.log(["ga.queue.send.batch", payloadData]);
            //使用批量上报接口
            apiUrl = this.trackerServer + '/batch';
        }else {
            this.ga.log && console.log(["ga.queue.send.collect", payloadData]);
        }

        request({
            url: apiUrl,
            data: payloadData,
            method: 'POST',
            header: {
                "content-type": "text/plain" //"application/x-www-form-urlencoded"
            },
            success: function (res:object) {
                self.ga.log && console.log(["ga:success", res]);
            },
            fail: function (res:object) {
                self.ga.log && console.log(["ga:failed", res])
            },
            complete: function () {
                self.sending = false;
                setTimeout(function () {
                    self._do_send();
                }, 0);
            }
        })
    }
}