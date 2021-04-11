import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import * as filters from '@/utils/filters.js'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/animated.css'
import '@/plugins/vueScroll.js'
import fastClick from 'fastclick'
import './utils/permission'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

fastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')