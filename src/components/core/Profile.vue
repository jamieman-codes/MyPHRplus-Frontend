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
            this.error = null;
            await ApiService.deleteUser().then( () => {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                    this.$router.replace({
                        name: "Welcome"
                    });
                    });
            }).catch( (errr) => {
                this.error = errr.response.data;
            });
        }
    }
}
</script>