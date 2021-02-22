import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app";
import router from "./routes/index";
import store from "./store";
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { config } from './config.js';

Vue.config.productionTip = false

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
