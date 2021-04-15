<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">My Diary</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{ error }}</div>
                        <div v-else-if="response" class="alert alert-success">{{ response }}</div>
                        <div v-if="view == 'main'" class="row text-center">
                            <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="items">
                                <template #table-busy>
                                    <div class="text-center text-danger my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>Loading...</strong>
                                    </div>
                                </template>
                                <template #cell(ref)="data">
                                    <b-button-group>
                                        <b-button variant="success" @click="viewDiaryEntry(data.value)">View</b-button>
                                        <b-button variant="danger" @click="deleteDiaryEntry(data.value, data.index)">Delete</b-button>
                                    </b-button-group>
                                </template>
                            </b-table>
                            <div class="col-md-4 text-md-centre">
                                <b-button variant="success" @click="setView('new')">New Entry</b-button>  
                            </div>
                        </div>
                        <div v-else-if="view == 'new'">
                            <div class="col-md-4 text-md-left">
                                <b-button @click="setView('main')">Back</b-button>
                            </div> <br>
                            <b-form inline>
                                <label class="mr-sm-2" for="inline-form-input-name">Diary Entry Title: </label>
                                <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="name" required />
                            </b-form> <br>
                            <vue-editor v-model="content" :editor-toolbar="customToolbar"/> <br>
                            <div class="col-md-12 text-md-right">
                                <b-button variant="success" @click="submitDiary()">Submit</b-button>
                            </div>
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
        </div>
    </div>      
</template>
    
<script>
import { VueEditor } from "vue2-editor";
import { ApiService } from "@/components/api.js";

export default {
    components: { VueEditor },

    data() { return {
        error: null,
        response: null,
        isBusy: false,
        content: "",
        view: "main",
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
        }],
        customToolbar: [
            [{ header: [false, 1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ["link"],
            ["clean"] // remove formatting button
        ],
        name: '',
        diaryContent: '',
        loading: false
    }},
    methods:{
        setView(option){
            this.view=option;
            this.error = null;
            this.response = null;
        },
        async submitDiary(){
            this.error = null;
            this.response = null;
            if(this.name == ""){
                this.error = "Please enter a title";
                return; 
            }
            let NameRE = /^[a-zA-Z0-9 !@#&()`.+,/"-]*$/
            if(!NameRE.exec(this.name)){
                this.error = "Title is not valid, please enter only alphanumeric characters or symbols: !@#&()`.+,/\"-"
                return;
            }
            if(this.content == ""){
                this.error = "Please enter some content";
                return;
            }

            let formData = new FormData();
            formData.append("name", this.name);
            formData.append("content", this.content);
            await ApiService.uploadDiary(formData).then((res) => {
                this.response = res.data;
            }).catch((errr) => {
                this.error = errr.response.data;
            })
            await ApiService.getDiaries("").then((res) => {
                this.items = res.data
            }).catch((errr) => {
                this.error = errr.response.data;
            })
        },
        async viewDiaryEntry(value){
            this.error = null;
            this.loading = true;
            this.view = "view";
            let formData = new FormData();
            formData.append("ref", value);
            await ApiService.getDiary(formData).then((res) => {
                this.diaryContent = res.data;
            }).catch((errr) => {
                this.error = errr.response.data;
            })
            this.loading = false;
        },
        async deleteDiaryEntry(value, pos){
            this.error = null;
            this.isBusy = true;
            let formData = new FormData();
            formData.append("ref", value);
            await ApiService.deleteDiary(formData).then(() => {
                this.items.splice(pos, 1);
            }).catch( (errr) => {
                this.error = errr.response.data;
            })
            this.isBusy = false;
        }
    },
    async mounted() {
        this.isBusy = true;
        await ApiService.getDiaries("").then((res) => {
            this.items = res.data
        }).catch((errr) => {
            this.error = errr.response.data;
        })
        this.isBusy = false;
    }
}
</script>