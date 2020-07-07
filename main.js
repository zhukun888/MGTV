import Vue from 'vue'
import App from './App'
import store from './store'
import util from './libs/util';
Vue.prototype.util = util
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
