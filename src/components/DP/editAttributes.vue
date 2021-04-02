<template>
    <div class="container" v-if="view == 'main'">
            <div class="card ">
                <div class="card-header">Users registered</div>
                <div class="card-body text-center">
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <b-table striped bordered hover sticky-header :busy="isBusy" :fields="fields" :items="items" select-mode="single" selectable @row-selected="onRowSelected">
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                    </b-table>
                    <p>
                        <b-button pill :disabled="isActive" size="sm" @click="viewAttributes()">View/Edit Attributes</b-button>
                    </p>
                </div>
            </div>
    </div>
    <div class="container" v-else-if="view == 'edit'">
        <div class="card ">
            <div class="card-header">{{selected[0]['name']}}'s Attributes</div>
            <div class="card-body text-center">
                <div class="col-md-4 text-md-left">
                    <b-button @click="setView('main')">Back</b-button>
                </div>
                <br>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <b-table striped bordered hover :busy="isBusy" :fields="atrFields" :items="atrItems" v-bind:key="isBusy">
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
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="attribute" required onkeypress="return event.charCode != 32" />
                    <b-button type="submit" variant="primary">Add</b-button>
                </b-form>
            </div>
        </div>
  </div>
</template>

<script>
import { ApiService } from "@/components/api.js";

export default {
    data() {
        return {
            error: null,
            isBusy: false,
            isActive: true,
            fields: [
                {
                    key: "name",
                    sortable: true
                },
                {
                    key: "email",
                    sortable: true
                },
                {
                    key: "role",
                    sortable: true
                },
                
            ],  
            items: [],
            selected: [],
            view: 'main',
            atrFields: [
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
            atrItems: [],
            attribute: ''
        } 
    },
    async mounted() {
        this.isBusy = true;
        await ApiService.getAllInBucket().then( (res) =>{
            this.items = res.data;
        }).catch((errr) => {
            console.log(errr);
        });
        this.isBusy = false;
    },
    methods: {
        onRowSelected(items){
            this.isActive = false;
            this.selected = items;
        },
        setView(option){
            this.view=option;
        },
        async viewAttributes(){
            this.isBusy = true;
            this.view = "edit";
            let formData = new FormData();
            formData.append("uid", this.selected[0]["uid"])
            await ApiService.getUserAttributes(formData).then( (res) => {
                    this.atrItems = res.data;
                }).catch((errr) => {
                    console.log(errr);
                });
            this.isBusy = false;
        },
        async deleteAtr(attr){
           this.isBusy = true;
            let formData = new FormData();
            formData.append("uid", this.selected[0]["uid"]);
            formData.append("attribute", attr)
            await ApiService.removeUserAttribute(formData).then( async () => {
                let formData = new FormData();
                formData.append("uid", this.selected[0]["uid"]);
                await ApiService.getUserAttributes(formData).then( (res) =>{
                    this.atrItems = res.data;
                })
            }).catch((errr) => {
                this.error = errr.response.data;
            });
            this.isBusy = false;
        },
        async addAtr(event){
            event.preventDefault();
            this.isBusy = true;
            this.error = null;
            let formData = new FormData();
            formData.append("uid", this.selected[0]["uid"]);
            formData.append("attribute", this.attribute);
            await ApiService.addUserAttribute(formData).then( async () => {
                let formData = new FormData();
                formData.append("uid", this.selected[0]["uid"]);
                await ApiService.getUserAttributes(formData).then( (res) => {
                    this.atrItems = res.data;
                }).catch(() => {
                    this.atrItems.push({attribute: this.attribute, delete: true});
                });
            }).catch((errr) => {
                this.error = errr.response.data;
            });
            this.isBusy = false;
        }
    }
}
</script>