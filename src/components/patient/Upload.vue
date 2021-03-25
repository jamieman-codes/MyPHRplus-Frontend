<template>
    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-else-if="response" class="alert alert-success">{{ response }}</div>
            <template v-if="loading">
                <div class="text-center">
                    <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
                </div>
            </template>
            <template v-else>
                <form action="#" @submit.prevent="submit">
                    <div class="form-group row">
                        <label for="name" class="col-md-4 col-form-label text-md-right">File Name:</label>
                        <div class="col-md-6">
                            <input id="name" type="name"  class="form-control" name="name" value required autofocus v-model="form.name" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-4 col-form-label text-md-right">File:</label>
                        <div>
                            <input type="file" id="file" ref="file" accept=".pdf, .png, .jpg, .jpeg, .mp3" required v-on:change="handleFileUpload()"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-4 col-form-label text-md-right">Who should be able to access the file?</label>
                        <div>
                            <b-form-checkbox-group
                                id="checkbox-group-1"
                                v-model="form.accessPolicy" 
                                :options="options"
                            />    
                        </div>
                    </div>
                    <div class="form-group row" v-if="this.form.accessPolicy.includes('custom')">
                        <label class="col-md-4 col-form-label text-md-right">Custom access policy:</label>
                        <div class="col-md-6">
                            <input id="customAccessPolicy" type="name"  class="form-control" name="customAccessPolicy" value required autofocus v-model="form.customAccessPolicy" />
                            <small id="customPolicyHelp" class="form-text text-muted text-md-left">Please enter attributes of users you would like to access this file seperated by a comma. Attributes cannot contain spaces.</small>
                            <small id="customPolicyHelp" class="form-text text-muted text-md-left">E.G. "Diabetic,Under25" will mean anyone with both the Diabetic and Under 25 attribute will be able to access the file</small>
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-4">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </template>
        </div>
    </div>
</template>

<script>
import { ApiService } from "@/components/api.js";

export default {
  data() {
    return {
        form: {
            name: "",
            file: "",
            accessPolicy: [],
            customAccessPolicy: ""
        },
        error: null,
        response: null,
        options: [
          { text: 'Me', value: 'patient' },
          { text: 'My Doctor', value: 'DR' },
          { text: 'My Hospital', value: 'DP' },
          { text: 'Custom Policy', value: 'custom' }
        ],
        loading: false
    };
  },
  methods: {
    async submit() {
        this.error = null;
        this.response = null;
        let formData = new FormData();
        //Handle validation of file here!
        formData.append("file", this.form.file);
        formData.append("name", this.form.name);
        formData.append("accessPolicy", this.form.accessPolicy);
        formData.append("customAccessPolicy", this.form.customAccessPolicy);
        this.loading = true;
        await ApiService.uploadFilePatient(formData)
        .then((res) => {
            this.response = res.data;
        })
        .catch((errr) => {
            this.error = errr.response.data;
        });
        this.loading = false;
    },
    handleFileUpload() {
      this.form.file = this.$refs.file.files[0];
    }
  }
};
</script>