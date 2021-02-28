<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">{{user.userName}}'s profile</div>
                    <div class="card-body">
                        <div v-if="error" class="alert">{{error}}</div>
                        <b-button @click="deleteUser" variant="danger">Delete account</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ApiService } from "@/components/api.js"
import firebase from "firebase";

export default {
    data() {
        return {
            error: null
        };
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
                user.delete().then( () => {
                    this.$router.push({ name: 'Welcome'});
                }).catch(function(error) {
                    this.error = error.message
                });
            } 
            else{
                this.error = "pie"
            }
        }
    }
}
</script>