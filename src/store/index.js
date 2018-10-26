import Vue from 'vue'
import Vuex from 'vuex'
import { post } from '@/api/http'
Vue.use(Vuex)
// 这里定义初始值
let state = {
  city: '',
  user: '',
  lat: localStorage.getItem("lat"),
  lng: localStorage.getItem("lng"),
  classifylist: "", //全部分类
  topclassify:"",
  search:"22"
}
const mutations = {
  classifyvu(state, n) {
    state.classifylist = n
  },
  settopclassify(state, n) {
    state.topclassify = n
  },
  setuser(state, n) {
    state.user = n
  },
  setlng(state, n) {
    state.lng = n
  },
  setlat(state, n) {
    state.lat = n
  },
  setsearch(state,n){
    state.search = n
  }

};

const actions = {
  actcity(context) {
    context.commit('setcity')
  },
  actlng(context) {
    context.commit('setlng')
  },
  actlat(context) {
    context.commit('setlat')
  }
};

// 返回改变后的数值
const getters = {
  messagehide(state, getters) {
    return !state.messagehide
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
