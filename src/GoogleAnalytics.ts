import {getUUID, getStorageSync, setStorageSync, getSystemInfo} from "./utils";
import {Tracker} from "./Tracker";

export class GoogleAnalytics {
    app: object | undefined;   // APP名称
    appName: string;   // APP名称
    appVersion: string;  // 版本号
    log: boolean;    // 是否打印上报结构
    cid: string | undefined;  // 设备id
    systemInfo: any;  // 系统信息
    vp: string;  // 屏幕信息
    trackers: Array<Tracker>;  // 跟踪器

    constructor(app: object | undefined) {
        this.app = app;
        this.appName = 'unknown';
        this.appVersion = 'unknown';
        this.cid = this.getCid();
        this.log = true;
        this.systemInfo = getSystemInfo();
        this.vp = [this.systemInfo.windowWidth, this.systemInfo.windowHeight].map(x => x).join('x');
        this.trackers = [];
    }

    /**
     * 获取cid
     * */
    getCid(): string {
        const cidKey = '_ga_cid';
        let cid = getStorageSync(cidKey);
        if (!cid) {
            cid = getUUID();
            setStorageSync(cidKey, cid);
        }

        return cid;
    }

    /**
     * 设置APP名称
     * @param appName
     * */
    setAppName(appName:string | undefined): GoogleAnalytics  {
        if(appName){
            this.appName = appName;
        }
        return this;
    }

    /**
     * 设置版本号
     * @param appVersion
     * */
    setAppVersion(appVersion:string | undefined): GoogleAnalytics {
        if(appVersion){
            this.appVersion = appVersion;
        }
        return this;
    }

    /**
     * 获取默认跟踪器
     * */
    getDefaultTracker(): Tracker | undefined {
        return this.trackers[0];
    }

    /**
     * 设置跟踪器
     * @param trackingId
     * */
    newTracker(trackingId: string | undefined): Tracker | undefined {
        if(!trackingId) return ;
        const t = new Tracker(this, trackingId);
        this.trackers.push(t);
        return t;
    }

    /**
     * 设置是否打印上报情况
     * @param flag
     * */
    setLog(flag: boolean | undefined): GoogleAnalytics {
        this.log = !!flag;
        return this;
    }
}
