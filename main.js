import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 通用全局变量
Vue.prototype.isLogin = false; // false 没有登陆 

const app = new Vue({
    ...App
})
app.$mount()
