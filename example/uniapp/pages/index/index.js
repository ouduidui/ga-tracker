import ga from "../../../../dist/ga";

const GoogleAnalytics = ga.GoogleAnalytics;
const HitBuilders = ga.HitBuilders;

const gaTest = {
    instance: null,
    getInstance() {
        if (!this.instance) {
            // 初始化GoogleAnalytics Tracker
            this.instance = GoogleAnalytics.getInstance()
                .setAppName('uniapp')
                .setAppVersion('1.0.0')
                .newTracker('UA-182679881-4')
        }
        return this.instance;
    },
}

export default {
    onLoad() {
        uni.getSystemInfo()
    },
    methods: {
        trackScreen() {
            gaTest.getInstance()
                .setScreenName('首页')
                .send(new HitBuilders.ScreenViewBuilder()
                    .build());
        },
        trackEvent() {
            gaTest.getInstance()
                .send(new HitBuilders.EventBuilder()
                    .setCategory('首页')
                    .setAction('点击')
                    .setLabel('测试上报事件') // 可选
                    .setValue(1) // 可选
                    .build());
        },
        trackError() {
            try {
                throw new Error('测试上报错误')
            } catch (err) {
                console.log(err)

                gaTest.getInstance()
                    .send(new HitBuilders.ExceptionBuilder()
                        .setDescription(err)
                        .setFatal(false) // 可选，是否严重错误，默认为 true
                        .build());
            }
        }
    }
}