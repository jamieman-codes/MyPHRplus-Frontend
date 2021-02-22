<template>
  <div>
    <template v-if="user.loggedIn">
      <navbar></navbar>
    </template>
        <main class="py-4">
          <router-view></router-view>
        </main>
  </div>
</template>

<script>
import navbar from "./components/core/Navbar";
import { mapGetters } from "vuex";
export default {
  components: {
    navbar
  },
computed: {
    ...mapGetters({
      user: "user"
    })
  }
}
</script>