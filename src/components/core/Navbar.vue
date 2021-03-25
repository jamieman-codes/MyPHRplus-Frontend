<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-container>
                <template v-if="user.role == 'admin'">
                  <b-navbar-brand to="/admin/dashboard">MyPHR+ Admin</b-navbar-brand>
                </template>
                <template v-else>
                  <b-navbar-brand to="/dashboard">MyPHR+</b-navbar-brand>
                </template>
                <b-navbar-nav>
                  <template v-if="user.role == 'Patient'">
                     <b-nav-item to="/myrecords">MyRecords</b-nav-item>
                     <b-nav-item href="#">Diary</b-nav-item>
                  </template>
                  <template v-else-if="user.role == 'DR'">
                    <b-nav-item to="/myPatients">My Patients</b-nav-item>
                    <b-nav-item href="#">My Files</b-nav-item>
                  </template>
                  <template v-else-if="user.role =='DP'">
                    <b-nav-item href="#">Upload</b-nav-item>
                    <b-nav-item to="/registerDR">Add DR</b-nav-item>
                  </template>
                  <template v-else-if="user.role =='admin'">
                    <b-nav-item href="#">View Logs</b-nav-item>
                    <b-nav-item to="/admin/registerDP">Add DP</b-nav-item>
                  </template>
                </b-navbar-nav>
                 <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                      <b-nav-item-dropdown right>
                          <template slot="button-content"><em>{{user.userName}}</em></template>
                          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                          <b-dropdown-item to="/" @click.prevent="signOut">Sign Out</b-dropdown-item>
                      </b-nav-item-dropdown>
                </b-navbar-nav>
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