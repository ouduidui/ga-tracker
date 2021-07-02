import Vue from 'vue'
import App from './App'
import {GoogleAnalytics} from "@ouduidui/ga-tracker";

const gaTracker = {
    instance: null,
    getInstance() {
        if (!this.instance) {
            // 初始化GoogleAnalytics Tracker
            this.instance = GoogleAnalytics.getInstance()
                .setAppName('UniApp')
                .setAppVersion('1.0.0')
                .newTracker('UA-182679881-4');

            // #ifdef MP-WEIXIN
            // 使用自己的合法域名做跟踪数据转发
            this.instance.setTrackerServer("https://ga.proxy.chillcy.com");
            // #endif
        }
        return this.instance;
    },
}

Vue.prototype.$gaTracker = gaTracker;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
