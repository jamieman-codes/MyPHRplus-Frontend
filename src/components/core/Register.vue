<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <template v-if="loading">
            <div class="card-body text-center ">
              <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
             </div>
          </template>
          <template v-else>
            <div class="card-body">
              <div v-if="error" class="alert alert-danger">{{error}}</div>
              <form action="#" @submit.prevent="submit">
                <div class="form-group row">
                  <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                  <div class="col-md-6">
                    <input id="email" type="email" class="form-control" name="email" value required autofocus v-model="form.email" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                  <div class="col-md-6">
                    <input id="name" type="name"  class="form-control" name="name" value required autofocus v-model="form.name" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                    <input id="password" type="password" class="form-control" name="password" required v-model="form.password" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="nhsnum" class="col-md-4 col-form-label text-md-right">NHS Number</label>

                  <div class="col-md-6">
                    <input id="nhsnum" type="number" class="form-control" name="nhsnum" pattern="^\d{10}$" value required autofocus v-model="form.nhsnum" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="DP" class="col-md-4 col-form-label text-md-right">Choose a hospital to Register with</label>
                  <div class="col-md-6">
                    <v-select label="text" required :options="options" v-model="form.parent" :reduce="text => text.value"></v-select>
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/app";
import 'firebase/auth';
import { ApiService } from "@/components/api.js"

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        nhsnum: "",
        parent: ""
      },
      options: null,
      error: null,
      loading: false
    };
  },
  async mounted() {
    this.loading = true;
    await ApiService.getAllDPs().then( (res) =>{
            this.options = res.data;
        }).catch((errr) => {
            this.error = errr.response.data;
        });
  this.loading = false;

  },
  methods: {
    submit() {
      this.error = null;

      let NameRE = /^[a-z ,.'-]+$/i;
      if(!NameRE.exec(this.form.name)){
        this.error = "Name should only contain letters or symbols(, . ' -)"
        return;
      }
      let NHSre = /^\d{10}$/;
      if(!NHSre.exec(this.form.nhsnum)){
        this.error = "NHS Number not valid (Should be 10 digits)"
        return;
      }


      firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password) //Creates user with firebase Auth
        .then(async (data) => {
              data.user.updateProfile({ displayName: this.form.name });
              await ApiService.registerPatient(this.form.name, this.form.email, this.form.nhsnum, this.form.parent).then(() => {
                this.$router.push({ name: 'Dashboard'});
              })
            .catch(errr => {
              data.user.delete(); //Delete user if registration fails 
              this.error = errr.response.data;
          });
        })
        .catch(errr => {
          this.error = errr.message;
        });
    }
  }
};
</script>