import HitBuilder from "../core/HitBuilder";
import {hit_delete_if} from "../utils";
import {HitType} from "../type";

// 上报计时
export default class TimingBuilder extends HitBuilder {
    constructor() {
        super();
        this.setAll({
            utc: "",
            utv: "",
            utt: 0,
            utl: "",
            plt: 0,
            dns: 0,
            pdt: 0,
            rrt: 0,
            tcp: 0,
            srt: 0,
            dit: 0,
            clt: 0,
        } as TimingType);
    }

    /**
     * 设置用户计时类别
     * */
    setCategory(category: string):TimingBuilder {
        return <TimingBuilder>this.set('utc', category);
    }

    /**
     * 设置用户计时变量名称
     * */
    setVariable(variable: string):TimingBuilder {
        return <TimingBuilder>this.set('utv', variable);
    }

    /**
     * 设置用户计时时间(毫秒)
     * */
    setValue(value: number):TimingBuilder {
        return <TimingBuilder>this.set('utt', value);
    }

    /**
     * 设置用户计时标签
     * */
    setLabel(label: string = ''):TimingBuilder {
        return <TimingBuilder>this.set('utl', label);
    }

    /**
     * 设置页面加载时间(毫秒)
     * */
    setPageLoadTime(pageLoadTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('plt', pageLoadTime);
    }

    /**
     * 设置DNS时间(毫秒)
     * */
    setDNSTime(dnsTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('dns', dnsTime);
    }

    /**
     * 设置页面下载时间(毫秒)
     * */
    setPageDownloadTime(pageDownloadTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('pdt', pageDownloadTime);
    }

    /**
     * 设置重定向响应时间(毫秒)
     * */
    setRedirectResponseTime(redirectResponseTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('rrt', redirectResponseTime);
    }

    /**
     * 设置tcp连接时间(毫秒)
     * */
    setTCPConnectTime(tcpConnectTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('tcp', tcpConnectTime);
    }

    /**
     * 设置服务器响应时间(毫秒)
     * */
    setServerResponseTime(serverResponseTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('srt', serverResponseTime);
    }

    /**
     * 设置DOM互动时间(毫秒)
     * */
    setDocumentInteractiveTime(documentInteractiveTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('dit', documentInteractiveTime);
    }

    /**
     * 设置内容加载时间(毫秒)
     * */
    setContentLoadedTime(contentLoadedTime: number = 0):TimingBuilder {
        return <TimingBuilder>this.set('clt', contentLoadedTime);
    }

    build():HitType {
        // 去除无效字段字段
        hit_delete_if(this, 'utl', '');
        hit_delete_if(this, 'plt', 0);
        hit_delete_if(this, 'dns', 0);
        hit_delete_if(this, 'pdt', 0);
        hit_delete_if(this, 'rrt', 0);
        hit_delete_if(this, 'tcp', 0);
        hit_delete_if(this, 'srt', 0);
        hit_delete_if(this, 'dit', 0);
        hit_delete_if(this, 'clt', 0);

        return super.build();
    }
}

interface TimingType {
    utc: string;  // 用户计时类别
    utv: string;  // 用户计时变量名称
    utt: number;  // 用户计时时间
    utl?: string;  // 用户计时标签
    plt?: number;  // 页面加载时间
    dns?: number;  // DNS时间
    pdt?: number;  // 页面下载时间
    rrt?: number;  // 重定向响应时间
    tcp?: number;  // tcp连接时间
    srt?: number;   // 服务器响应时间
    dit?: number;  // DOM互动时间
    clt?: number;  // 内容加载时间
}
