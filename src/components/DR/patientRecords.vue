<template>
    <div class="container">
        <div class="card ">
            <div class="card-header">{{patient['name']}}'s Records</div>
            <div class="card-body text-center">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <b-table striped bordered hover :busy="isBusy" :fields="fields" :items="items">
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(fileType)="data">
                        <div v-if="data.value == 'image'">
                            <p class="h3 mb-2"><b-icon-file-earmark-image/></p>
                        </div>
                        <div v-else-if="data.value =='application'">
                            <p class="h3 mb-2"><b-icon-file-earmark-richtext/></p>
                        </div>
                        <div v-else-if="data.value =='audio'">
                            <p class="h3 mb-2"><b-icon-file-earmark-music/></p>
                        </div>
                    </template>
                    <template #cell(ref)="data">
                        <b-button @click="downloadFile(data.value, data.item.fileName)">Download</b-button>
                    </template>
                </b-table>
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
            isBusy: true,
            patient: this.selected[0],
            fields: [
            {
                key: "fileName",
                sortable: true
            },
            {
                key: "fileType",
                sortable: true
            },
            {
                key: "ref",
                label: ""
            }
            ],  
            items: [],
            error: null
        }
    },
    async mounted() {
        this.isBusy = true;
        await ApiService.getPatientFiles(this.patient['nhsNum']).then( (res) =>{
            this.items = res.data;
        }).catch((errr) => {
            console.log(errr);
        });
        this.isBusy = false;
    },
    methods: {
        async downloadFile(fileRef, fileName){
            this.isBusy = true;
            this.error = false;
            await ApiService.downloadFile(fileRef).then( (res) => {
                console.log(res.headers);
                var contentType = res.headers["content-type"];
                var blob=new Blob([res.data], {type: contentType});// change resultByte to bytes
                var fileDownload = require('js-file-download');
                fileDownload(blob, fileName + "." + contentType.split("/")[1]);
            }).catch(() => {
                this.error = "File could not be downloaded, may not have correct attributes";
            });
            this.isBusy = false;
        }
    }
}
</script>