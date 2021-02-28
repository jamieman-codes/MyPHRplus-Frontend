<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <template v-if="siteInfo.loading">
              <div class="text-center">
                 <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
              </div>
            </template>
            <template v-else>
              <div v-if="user" class="alert alert-success text-center" role="alert">You are a {{user.role}}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store.js";
import firebase from "firebase";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      siteInfo : "siteInfo"
    })
  },
  mounted() {
    var user = firebase.auth().currentUser;
    if (user) {
      store.dispatch("fetchUser", user);
    }
  }
};
</script>