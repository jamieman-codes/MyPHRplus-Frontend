<template>
    <div class="row justify-content-center">
        <b-card>
            <div class="card-header">{{user.userName}}'s profile</div>
            <div v-if="response" class="alert">{{response}}</div>
            <b-button @click="deleteUser" variant="danger">Delete account</b-button>
        </b-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ApiService } from "@/components/api.js"
import firebase from "firebase";

export default {
    data() {
        return {
        }
    },
    computed: {
    ...mapGetters({
      user: "user"
    })
  },
    methods: {
        async deleteUser() {
            const res = await ApiService.deleteUser();
            if(res.status == 200){
                var user = firebase.auth().currentUser;
                user.delete().then(function() {
                    this.$router.push({ name: 'Welcome'});
                }).catch(function(error) {
                    this.response = error.message
                });
            } 
            else{
                this.response = "pie"
            }
        }
    }
}
</script>