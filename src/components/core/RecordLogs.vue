<template>
    <div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <b-table sticky-header striped bordered :busy="isBusy" :fields="fields" :items="items">
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
                <template #cell(successful)="data">
                    <div v-if="data.value">
                        <p class="h3 mb-2"><b-icon-check/></p>
                    </div>
                    <div v-else>
                        <p class="h3 mb-2"><b-icon-x/></p>
                    </div>
            </template>
        </b-table>
    </div>
</template>

<script>
import { ApiService } from "@/components/api.js";

export default {
    props: {
        fileRef: String 
    },
    data(){
        return{
            isBusy: false,
            fields: [{
                key: "name",
                sortable: true
            },{
                key: "date",
                sortable: true
            },{
                key: "successful",
                label: "Successful?"
            }],
            items: [],
            error: false
        }
    },
    async mounted() {
        this.isBusy = true;
        let formData = new FormData();
        formData.append("fileRef", this.fileRef);
        await ApiService.viewFileLogs(formData).then((res) => {
            this.items = res.data
        }).catch((errr) => {
            this.error = errr.response.data;
        });
        this.isBusy = false;
    }
}
</script>