import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '' // 携带方法，放在http请求头中
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {

  },
  getters: { // 只读
    isLogin: state => {
      return !!state.token; //转换为布尔值
    }

  }
})
