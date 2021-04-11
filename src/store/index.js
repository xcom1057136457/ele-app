import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    global
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage //选择sessionStorage 进行存储
  })]
})