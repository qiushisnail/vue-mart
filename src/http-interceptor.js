// 拦截axios所有http请求，预先放入token请求头 只需要执行一次
import axios from 'axios'
import store from './store'
import router from './router';

axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 若存在令牌，则放入请求头
      config.headers.token = store.state.token;
    }
    return config;
  }
)

// 响应拦截器，提前预处理响应
axios.interceptors.response.use(
  response => {
    // 如果code是-1,说明用户已注销或者token已过期
    // 此时需要重新登录，并且还有清除本地缓存信息
    if (response.status == 200) { // 响应成功 
      const data = response.data;
      if (data.code == -1) {
        clearHandle()
      }
    }
    return response
  }, err => {
    if (err.response.status === 401) { // 未授权
      clearHandle()
    }
  }
)

function clearHandle() {
  // 清空换粗
  store.commit('setToken', '');
  localStorage.removeItem('token');
  // 跳转只登录页
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  })
}