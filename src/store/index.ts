import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    token: null,
    user: {}
  },
  getters: {
  },
  mutations: {
    SET_STATE (state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    LOGOUT_USER(state) {
      state.token = null;
      state.user = {}
    },
    REFRESH_TOKEN(state, {token}) {
      state.token = token;
    },
    UPDATE_USER(state, {user}) {
      state.user = user;
    },
  },
  actions: {
    updateUser({commit}, user) {
      return commit('UPDATE_USER', {user})
    },
  },
  modules: {
  },
  plugins:[vuexLocal.plugin],
})
