<template>
  <div class="container">
        <div class="card ">
            <div class="card-header">{{patient['name']}}'s Reminders</div>
            <div class="card-body text-center">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="items">
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                </b-table>
                <b-form inline @submit="addReminder">
                    <label class="mr-sm-2" for="inline-form-input-name">New Reminder: </label>
                    <b-form-input id="inline-form-input-name" class="" v-model="reminder" required />
                    <b-button type="submit" variant="primary">Add</b-button>
                </b-form>
            </div>
        </div>
  </div>
</template>

<script>
import { ApiService } from "@/components/api.js";

export default {
    props: {
        selected: Array
    },
    data(){
        return{
            isBusy: false,
            patient: this.selected[0],
            fields: [{
                key: "reminder",
                label: "Reminders"
            }],
            items: [],
            reminder: '',
            error: null
        }
    },
    methods: {
        async addReminder(event){
            event.preventDefault();
            this.error = null;
            let reminderRE = /^[a-zA-Z0-9 !@#$&()`.+,/"-]*$/;
            if(!reminderRE.exec(this.reminder)){
                this.error = "Invalid reminder entered"
                return;
            }
            this.isBusy = true;
            let formData = new FormData();
            formData.append("nhsNum", this.patient['nhsNum']);
            formData.append("reminder", this.reminder)
            await ApiService.addReminder(formData).then( () => {
                this.items.push({reminder: this.reminder});
            }).catch( (errr) => {
                this.error = errr.response.data;
            });
            this.isBusy = false;
        }
    },
    async mounted() {
        this.isBusy = true;
         let formData = new FormData();
        formData.append("nhsNum", this.patient['nhsNum']);
        await ApiService.getReminders(formData).then( (res) => {
            this.items = res.data;
        }).catch( (errr) => {
            this.error = errr.response.data;
        });
        this.isBusy = false;
    }
}
</script>