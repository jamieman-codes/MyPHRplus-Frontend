<template>
  <div class="container">
        <div class="card ">
            <div class="card-header">{{patient['name']}}'s Attributes</div>
            <div class="card-body text-center">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="items">
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(delete)="data">
                        <div v-if="data.item.remove == true">
                            <b-button variant="danger" @click="deleteAtr(data.item.attribute)">Remove</b-button>
                        </div>
                    </template>
                </b-table>
                <b-form inline @submit="addAtr">
                    <label class="mr-sm-2" for="inline-form-input-name">New Attribute: </label>
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="attribute" required onkeypress="return event.charCode != 32"/>
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
            fields: [
            {
                key: "attribute",
                label: "Attributes",
                sortable: true
            },
            {
                key: "delete",
                label: ""
            }
            ],  
            items: [],
            error: null,
            attribute: ''
        }
    },
    async mounted() {
        this.isBusy = true;
        let formData = new FormData();
        formData.append("nhsNum", this.patient['nhsNum']);
        await ApiService.getPatientAttributes(formData).then( (res) =>{
            this.items = res.data;
        }).catch((errr) => {
            this.error = errr.response.data;
        });
        this.isBusy = false;
    },
    methods: {
        async addAtr(event) {
            event.preventDefault()
            this.isBusy = true; 
            let formData = new FormData();
            formData.append("nhsNum", this.patient['nhsNum']);
            formData.append("attribute", this.attribute);
            await ApiService.addPatientAttribute(formData).then(() => {
                this.items.push({attribute: this.attribute, delete: true});
            }).catch((errr) => {
                this.error = errr.response.data;
            });
            this.isBusy = false;
      },
        async deleteAtr(attr){
            this.isBusy = true;
            let formData = new FormData();
            formData.append("nhsNum", this.patient['nhsNum']);
            formData.append("attribute", attr);
            await ApiService.removePatientAttribute(formData).then(() => {}).catch((errr) => {
                this.error = errr.response.data;
            });
            await ApiService.getPatientAttributes(this.patient['nhsNum']).then( (res) =>{
                this.items = res.data;
            }).catch((errr) => {
                this.error = errr.response.data;
            });
            this.isBusy = false;
      } 
    }
}
</script>