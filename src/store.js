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
    }
  },
  getters: {
    user(state) {
      return state.user
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
    }
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USERNAME", user.displayName);
        const res = await ApiService.getUser();
        if (res.status == 200) {
          commit("SET_ROLE", res.data.role);
        }
      } else {
        commit("NO_USER");
      }
    }
  }
});