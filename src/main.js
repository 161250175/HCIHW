import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'  // 使用 CSS
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import { Loading, Message, Notification } from 'element-ui'

import Vuex from 'vuex'
import { userInfo } from './api'
import { getStore } from './utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(ElementUI)
Vue.use(VueContentPlaceholders)
// Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/smile.png'
  // attempt: 1
})
Vue.config.productionTip = false
// const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
// router.beforeEach(function (to, from, next) {
//   let params = {
//     params: {
//       token: getStore('token')
//     }
//   }
//   userInfo(params).then(res => {
//     if (res.result.state !== 1) { // 没登录
//       if (whiteList.indexOf(to.path) !== -1) { // 白名单
//         next()
//       } else {
//         next('/login')
//       }
//     } else {
//       store.commit('RECORD_USERINFO', {info: res.result})
//       if (to.path === '/login') { //  跳转到
//         next({path: '/'})
//       }
//       next()
//     }
//   })
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
