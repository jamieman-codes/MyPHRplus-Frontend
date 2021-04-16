<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">{{user.userName}}'s profile</div>
                    <div class="card-body">
                        <div v-if="error" class="alert">{{error}}</div>
                        <div v-else-if="response" class="alert alert-success">{{ response }}</div>
                        <b-form inline @submit="updatePassword">
                            <label class="mr-sm-2" for="inline-form-input">Update password: </label>
                            <b-form-input id="inline-form-input" type="password" class="mb-2 mr-sm-2 mb-sm-0" v-model="password" required />
                            <b-button type="submit" variant="primary">Update</b-button>
                        </b-form>
                        <br>
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
            error: null,
            response: null,
            password: ""
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
            this.response =null;
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
        },
        updatePassword(event) {
            event.preventDefault();
            this.error = null;
            this.response = null;
            var user = firebase.auth().currentUser;
            user.updatePassword(this.password).then(() => {
                this.response = "Password updated"
            }).catch((error) => {
                this.error = error;
            });
        }
    }
}
</script>