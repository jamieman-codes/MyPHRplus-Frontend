<template>
    <div>
        <b>Welcome to MyPHR+</b>
        <template v-if="user.loggedIn">
            <b-card>
                <b>Welcome back {{user.data.displayName}}</b>
                <b-button href="/dashboard">Enter</b-button>
            </b-card>
        </template>
        <template v-else>
            <b-card>
                <b-button-group vertical>
                    <b-button href="/login">Login</b-button>
                    <b-button href="/register">Register</b-button>
                </b-button-group>
            </b-card>
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
    ...mapGetters({
      user: "user"
    })
  }
}
</script>