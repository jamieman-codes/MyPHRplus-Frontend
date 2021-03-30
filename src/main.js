import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app";
import router from "./routes/index";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

import { config } from './config.js';

Vue.config.productionTip = false

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('v-select', vSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
