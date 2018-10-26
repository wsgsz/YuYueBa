import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import { post, fetch, patch, put } from './api/http'
import Vuelidate from 'vuelidate' // 验证
import VueAwesomeSwiper from 'vue-awesome-swiper' // swiper 
import 'swiper/dist/css/swiper.css' // swiper 
import Element from 'element-ui' // element
import 'element-ui/lib/theme-chalk/index.css'; // element 样式库
import VueLazyload from 'vue-lazyload' // 懒加载

import { baseUrl, imgUrl } from './api/env'
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$http = axios
axios.defaults.timeout = 16000

Vue.filter()
Vue.use(Element)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuelidate)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/loading.png'),
  attempt: 1
})
// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);
Vue.use(baseUrl);
AMap.initAMapApiLoader({
  key: '7894f650c84612d68a9b47790e19f12f',
  plugin: ['AMap.Autocomplete', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
})

axios.defaults.baseURL = 'https://www.baiduyuyue.com/baiduyuyue'
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (localStorage.getItem('user_id') != null) {
      next()
    } else {
      next({ path: '/login', query: { Rurl: to.fullPath } })　　　　　
    }　　　　
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (localStorage.getItem('citychioce') != null) {
      next()
    } else {
      next({ path: '/hadmap', query: { Rurl: to.fullPath } })　　　　　
    }　　　　
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
