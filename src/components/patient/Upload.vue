<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div v-else-if="response" class="alert alert-success">{{response}}</div>
        <label>File
            <input type="file" id="file" ref="file" accept=".pdf, .png, .jpg, .jpeg" v-on:change="handleFileUpload()"/>
        </label>
        <b-button v-on:click="submitFile()">Submit</b-button>
    </div>
  </div>
</template>

<script>
    import { ApiService } from "@/components/api.js"

    export default {
        data(){
            return {
                file: '',
                error: null,
                response:null
            }
        },
        methods: {
            async submitFile(){
                this.error = null;
                this.response = null;
                let formData = new FormData();
                //Handle validation of file here!
                formData.append('file', this.file);
                await ApiService.uploadFile(formData).then( (res) => {
                    this.response = res.data
                }).catch((errr) => {
                    this.error= errr
                })
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>