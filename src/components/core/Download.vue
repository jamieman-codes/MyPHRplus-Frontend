<template>
    <div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-else-if="response" class="alert alert-success">{{ response }}</div>
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
                <b-button-group>
                    <b-button variant="success" @click="downloadFile(data.value, data.item.fileName)">Download</b-button>
                    <b-button @click="viewLog(data)">{{ data.detailsShowing ? 'Hide' : 'Show'}} access logs</b-button>
                    <b-button variant="danger" @click="deleteFile(data.value, data.index)">Delete</b-button>
                </b-button-group> 
            </template>

            <template #row-details="row">
                <recordLogs :fileRef="row.item.ref"/>
            </template>
            
        </b-table>
    </div>
</template>

<script>
import { ApiService } from "@/components/api.js";
import recordLogs from "@/components/core/RecordLogs"

export default {
    data() {
      return {
        isBusy: false,
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
        error: null,
        response: null
      }
    },
    async mounted() {
        this.isBusy = true;
        await ApiService.getFiles().then( (res) =>{
            this.items = res.data;
        }).catch((errr) => {
            this.error = errr.response.data;
        });
        this.isBusy = false;
    },
    components: {
        recordLogs
    },
    methods: {
        async downloadFile(fileRef, fileName){
            this.isBusy = true;
            this.error = null;
            this.response = null;
            let formData = new FormData();
            formData.append("fileRef", fileRef);
            await ApiService.downloadFile(formData).then( (res) => {
                var contentType = res.headers["content-type"];
                var blob=new Blob([res.data], {type: contentType});// change resultByte to bytes
                var fileDownload = require('js-file-download');
                fileDownload(blob, fileName + "." + contentType.split("/")[1]);
            }).catch(() => {
                this.error = "Could not download file, may have incorrect attributes"
            });
            this.isBusy = false;
        },

        async deleteFile(fileRef, pos){
            this.isBusy = true;
            this.error = null;
            this.response = null;
            let formData = new FormData();
            formData.append("fileRef", fileRef);
            await ApiService.deleteFile(formData).then( (res) => {
                this.response = res.data;
                this.items.splice(pos, 1);
            }).catch((errr) => {
                this.error = errr.response.data;
            })
            this.isBusy = false;
        },
        async viewLog(row){
            row.toggleDetails();
            console.log(row);
        }
    },
}
</script>