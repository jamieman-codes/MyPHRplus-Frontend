<template>
    <div class="row justify-content-center">
        <b-card title="Welcome to MyPHR+">
            <template v-if="user.loggedIn">
                    <div class="text-center">
                        <b>Welcome back {{user.userName}}</b>
                        <br><br>
                        <template v-if="user.role == 'admin'">
                            <b-button variant="success" to="/admin/Dashboard">Enter</b-button>
                        </template>
                        <template v-else>
                            <b-button variant="success" to="/dashboard">Enter</b-button>  
                        </template>
                    </div>
            </template>
            <template v-else>
                    <div class="text-center">
                        <b-button to="/login">Login</b-button>
                        <b-button to="/register">Register</b-button>
                    </div>
            </template>
        </b-card> 
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