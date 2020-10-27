import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []                      //用一个数组来保存需要添加到购物车的商品
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store