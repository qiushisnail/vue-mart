import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login.vue'
import Cart from '@/views/Cart.vue'
import History from '@/utils/history.js'
import store from './store';
Vue.use(Router)
Vue.use(History)

// 实例化之前，扩展router
Router.prototype.goBack = function () {
  this.isBack = true; 
  this.back()
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      meta: { auth: true }, //路由受保护
      component: () => import('./views/About.vue')
    }
  ]
})

// 守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要认证，则检查令牌
    if (store.state.token) {//已登录
      next()
    } else {
      // 去登录
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

// afterEach 记录历史记录
router.afterEach((to, from) => {
  if (router.isBack) {
    // 后退
    History.pop();
    router.isBack = false;
  } else {
    History.push(to.path);
  }

})
export default router;