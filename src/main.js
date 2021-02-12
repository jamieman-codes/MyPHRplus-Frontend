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

const configOptions = {
    apiKey: config.firebaseKey,
    authDomain: "myphrplus-frontend.firebaseapp.com",
    projectId: "myphrplus-frontend",
    storageBucket: "myphrplus-frontend.appspot.com",
    messagingSenderId: "125584718852",
    appId: "1:125584718852:web:b566d8654413bc4667c951",
    measurementId: "G-FXXKX0VEKK"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
