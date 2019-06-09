import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/Home'
import LoginTel from '@/page/LoginTel'
import LoginNor from '@/page/LoginNor'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'LoginTel',
      component:LoginTel
    },
    {
      path: '/login/normal',
      name: 'LoginNor',
      component:LoginNor
    },

  ],
})
