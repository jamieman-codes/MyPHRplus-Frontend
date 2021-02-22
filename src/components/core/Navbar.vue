<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-container>
                <b-navbar-brand href="/dashboard">MyPHR+</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                          <b-nav-item-dropdown right>
                              <template slot="button-content"><em>{{user.userName}}</em></template>
                              <b-dropdown-item href="#">Profile</b-dropdown-item>
                              <b-dropdown-item href="/" @click.prevent="signOut">Sign Out</b-dropdown-item>
                          </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>  
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      user: "user" // maps `this.user` to `this.$store.getters.user`
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Welcome"
          });
        });
    }
  }
};
</script>