import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	auth: 1,
  },
  getters:{
  	auth: state=>{
  		return state.auth;
  	}
  },
  mutations: {
  	increment: (state,payload)=>{
  		//state.auth++;
  		state.auth+=payload.by*payload.du;
  	}
  },
  actions: {
  	increment: ({commit},payload)=>{
  		commit('increment',payload);
  	}
  },
  modules: {
  }
})
