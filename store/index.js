import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import Header from './modules/Header'
import Product from './modules/product'
import Order from './modules/Order'



const createStore = () => {
  return new Vuex.Store({
    state: {
      darknes: false,
      isLoading: false
    },
    mutations,
    actions,
    getters,
    modules: {
      Header,
      Product,
      Order
    }
  })
}


export default createStore
