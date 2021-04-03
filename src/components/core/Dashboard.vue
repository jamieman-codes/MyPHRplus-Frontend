<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <template v-if="loading">
              <div class="text-center">
                 <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
              </div>
            </template>
            <template v-else>
              <b-card :title=this.cardTitle class="text-center">
                <div v-if="user.role=='Patient'" role="alert">
                    <h5>Your doctor is: {{ dashboardData.DR }}</h5>
                    <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="dashboardData.items">
                      <template #table-busy>
                          <div class="text-center text-danger my-2">
                              <b-spinner class="align-middle"></b-spinner>
                              <strong>Loading...</strong>
                          </div>
                      </template>
                      <template #cell(remove)="data">
                        <b-button variant="danger" @click="removeReminder(data.item.reminder, data.index)">X</b-button>
                      </template>
                    </b-table>
                </div>
                <div v-else-if="user.role == 'DR'">
                  <h5>Your Data Provider is: {{dashboardData.hospital}}</h5>
                  <h5>You have {{dashboardData.patients}} patients registered to you</h5>
                </div>
                <div v-else-if="user.role =='DP'">
                  <h5>There are {{dashboardData.DRs}} Data Requesters registered to your system</h5>
                </div>
              </b-card>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ApiService } from "@/components/api.js";
import store from "@/store.js";
import firebase from "firebase/app";
import 'firebase/auth';

export default {
  data() {
    return {
      loading: false,
      error: null,
      cardTitle: '',
      dashboardData: {},
      fields:[{
        key: "reminder",
        label: "Reminders"
      },{
        key:"remove",
        label: ""
      }],
      isBusy: false
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  async mounted() {
    this.loading = true;
    var user = firebase.auth().currentUser;
    if (user) {
      store.dispatch("fetchUser", user);
    }
    if(this.user.role == "DP"){
      this.cardTitle = this.user.userName + " PHR System";
    } else{
      this.cardTitle = "Welcome Back "+ this.user.userName;
    }
    await ApiService.getDashboardInfo().then( (res) => {
      this.dashboardData = res.data;
    }).catch( (errr) => {
      this.error = errr.response.data;
    })
    this.loading = false;
  },
  methods: {
    async removeReminder(reminder, pos){
      this.error = null;
      this.isBusy = true;
      let formData = new FormData();
      formData.append("reminder", reminder);
      await ApiService.removeReminder(formData).then( () => {
        this.dashboardData.items.splice(pos,1);
      }).catch((errr) =>{
        this.error = errr.response.data;
      });
      this.isBusy = false;
    }
  }
};
</script>