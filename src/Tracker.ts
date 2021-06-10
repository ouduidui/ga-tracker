import {TrackerHit} from "../type";
import {GoogleAnalytics} from "./GoogleAnalytics";

export class Tracker {
    ga: GoogleAnalytics;
    hit: TrackerHit;
    trackerServer: string;
    next_hit: object;
    sending: boolean;
    send_queue: Array<any>;


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

    // TODO
    get() {}
}