import { getAddress } from "@/api/index";
import store from '@/store'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    mark: "",
    addressIndex: 0,
    addressInfo: [],
    restaurantCategory: {}
  },
  getters: {
    selectAddress(state) {
      return state.addressInfo[state.addressIndex]
    }
  },
  mutations: {
    SetLoading(state, data) {
      state.isLoading = data
    },
    SetMark(state, data) {
      state.mark = data
    },
    SetAddressInfo(state, data) {
      state.addressInfo = data
    },
    SetAddressIndex(state, data) {
      state.addressIndex = data
    },
    SetRestaurantCategory(state, data) {
      state.restaurantCategory = data
    }
  },
  actions: {
    GetLoading({ commit }, params) {
      commit('SetLoading', params)
    },
    GetMark({ commit }, params) {
      commit('SetMark', params)
    },
    async GetAddress({ commit }) {
      let id = store.state.user.userInfo.id
      let response = await getAddress(id)
      commit('SetAddressInfo', response)
    },
    GetAddressIndex({ commit }, params) {
      commit('SetAddressIndex', params)
    },
    GetRestaurantCategory({ commit }, params) {
      commit('SetRestaurantCategory', params)
    }
  }
}