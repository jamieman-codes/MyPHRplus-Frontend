import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app";
import router from "./routes/index";
import store from "./store";
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const configOptions = {
    apiKey: "AIzaSyApM4gylqgmwdaBjROAKKTBOAmHQL-QxJ8",
    authDomain: "myphrplus-frontend.firebaseapp.com",
    projectId: "myphrplus-frontend",
    storageBucket: "myphrplus-frontend.appspot.com",
    messagingSenderId: "125584718852",
    appId: "1:125584718852:web:3392d8e1e0d4539767c951",
    measurementId: "G-5JD8MS45V0"
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
