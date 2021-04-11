export default {
  namespaced: true,
  state: {
    userInfo: {},
    addressDetail: {}
  },
  mutations: {
    // 设置用户信息
    SetUserInfo(state, data) {
      state.userInfo = data
    },
    // 设置地址信息
    SetAddress(state, data) {
      state.addressDetail = data
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({ commit }, params) {
      commit('SetUserInfo', params)
    },
    // 获取地址信息
    GetAddress({ commit }, params) {
      commit('SetAddress', params)
    }
  }
}