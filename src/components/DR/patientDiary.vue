<template>
  <div class="container">
        <div class="card ">
            <div class="card-header">{{patient['name']}}'s Diary</div>
            <div class="card-body">
                <div v-if="view == 'main'" class="row text-center">
                    <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="items">
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                        <template #cell(ref)="data">
                            <b-button variant="success" @click="viewDiaryEntry(data.value)">View</b-button>
                        </template>
                    </b-table>
                </div>
                <div v-else-if="view == 'view'">
                    <div class="col-md-4 text-md-left">
                        <b-button @click="setView('main')">Back</b-button>
                    </div> <br>
                    <template v-if="loading">
                        <div class="text-center">
                            <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
                        </div>
                    </template>
                    <template v-else>
                        <div v-html="diaryContent"/>
                    </template>
                </div>
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
            loading: false,
            patient: this.selected[0],
            diaryContent: '',
            view: "main",
            isBusy: false,
            items: [],
            fields: [{
                key: "name",
                label: "Name",
                sortable: true
            },{
                key: "date",
                label: "Date",
                sortable: true
            },{
                key:"ref",
                label: ""
            }]
        }
    },
    methods:{
        setView(option){
            this.view=option;
            this.error = null;
        },
        async viewDiaryEntry(value){
            this.error = null;
            this.loading = true;
            this.view = "view";
            let formData = new FormData();
            formData.append("ref", value);
            formData.append("identifier", this.patient['nhsNum']);
            await ApiService.getDiary(formData).then((res) => {
                this.diaryContent = res.data;
            }).catch((errr) => {
                this.error = errr.response.data;
            })
            this.loading = false;
        }
    },
    async mounted(){
        this.isBusy = true;
        let formData = new FormData();
        formData.append("identifier", this.patient['nhsNum']);
        await ApiService.getDiaries(formData).then((res) => {
            this.items = res.data;
        }).catch( (errr) => {
            this.error = errr.response.data;
        })
        this.isBusy = false;
    }
}
</script>