import Vue from 'vue'
import App from './App'
import gaTracker from "./utils/gaTracker";

Vue.prototype.$gaTracker = gaTracker;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
