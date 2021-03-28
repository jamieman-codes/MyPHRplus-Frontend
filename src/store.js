import Vue from "vue";
import Vuex from "vuex";
import { ApiService } from "@/components/api.js"

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      userName: null,
      role: null
    },
    siteInfo: {
      loading: false
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    siteInfo(state) {
      return state.siteInfo
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USERNAME(state, userName) {
      state.user.userName = userName;
    },
    SET_ROLE(state, role) {
      state.user.role = role;
    },
    NO_USER(state) {
      state.user.loggedIn = false;
      state.user.userName = null;
      state.user.role = null;
    },
    SET_LOADING(state, loading) {
      state.siteInfo.loading = loading;
    }
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit("SET_LOADING", true);
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USERNAME", user.displayName);
        const res = await ApiService.getRole();
        if (res.status == 200) {
          commit("SET_ROLE", res.data);
        }
      } else {
        commit("NO_USER");
      }
      commit("SET_LOADING", false);
    }
  }
});