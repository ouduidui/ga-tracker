import ga from "../../../../dist/index";

const GoogleAnalytics = ga.GoogleAnalytics;

let gaTracker = null;

function getInstance() {
    if(!gaTracker) {
        // 初始化GoogleAnalytics
        gaTracker = GoogleAnalytics.getInstance()
            .setAppName('UniApp')   // 设置APP名称
            .setAppVersion('1.0.0')   //设置APP版本号，[可选]
            .newTracker('UA-182679881-4');  // 创建一个跟踪器 Tracker

        // #ifdef MP-WEIXIN
        // 使用自己的合法域名做跟踪数据转发
        gaTracker.setTrackerServer('https://ga.example.com');
        // #endif

        // 设置用户ID
        gaTracker.setUserId('123456');
    }

    return gaTracker;
}

export default getInstance()
