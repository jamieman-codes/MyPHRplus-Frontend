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

                    <div class="container">
                        <div class="row">
                            <label class="col-md-4 col-form-label text-md-right">Access Policy:</label>
                            <div class="form-group">
                                <b-form-select id="inline-form-custom-select-pref" v-model="form.policy.selected" :options="form.policy.options" inline required></b-form-select> 
                            </div>
                            <h4>of {{this.form.policy.numOfAtrs}}</h4>
                            <div class="col text-md-left">
                                <b-button variant="success"  @click="newAttribute(form.policy)">+</b-button>
                            </div>
                        </div>
                        <div class="form-group col-md-10" >
                            <template v-for="(attribute, counter) in form.policy.attributes">
                                <div class="row" v-bind:key="counter">
                                    <div class="col text-md-right">
                                        <h4>{{counter + 1}}:</h4>
                                    </div>
                                    <div class="col">
                                        <template v-if="attribute.type=='text'">
                                            <input type="text" v-model="attribute.value" onkeypress="return event.charCode != 32" required>
                                        </template>
                                        <template v-else-if="attribute.type=='sub-policy'">
                                            <div class="card">
                                                <div class="card-header text-md-left">Sub Policy</div>
                                                <div class="card-body text-center">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="form-group">
                                                                <b-form-select id="inline-form-custom-select-pref" v-bind:key="attribute.value.numOfAtrs" v-model="attribute.value.selected" :options="attribute.value.options" inline></b-form-select> 
                                                            </div>
                                                            <h4>of {{attribute.value.numOfAtrs}}</h4>
                                                            <div class="col text-md-left">
                                                                <b-button variant="success"  @click="newAttribute(attribute.value)">+</b-button>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row" >
                                                            <template v-for="(subattribute, subcounter) in attribute.value.attributes">
                                                                <div v-bind:key="subcounter">
                                                                    <div class="d-flex flex-row">
                                                                        <h5>{{subcounter + 1}}:</h5>    
                                                                        <input type="text" v-model="subattribute.value" onkeypress="return event.charCode != 32" required>
                                                                        <b-button variant="danger" :disabled="attribute.value.buttonsDisabled" @click="removeAttribute(attribute.value, subcounter)">X</b-button>
                                                                    </div>
                                                                    <br>
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br>
                                        </template>
                                        <template v-else>
                                            <b-button-group>
                                                <b-button @click="setInputType(attribute, 'text', form.policy)">Attribute</b-button>
                                                <b-button @click="setInputType(attribute, 'sub-policy', form.policy)">Sub Policy</b-button>
                                            </b-button-group>
                                        </template>
                                    </div>
                                    <div class="col text-md-left">
                                        <b-button variant="danger" :disabled="form.policy.buttonsDisabled" @click="removeAttribute(form.policy, counter)">X</b-button>
                                    </div>
                                    <br><br>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="DP" class="col-md-4 col-form-label text-md-right">Who can see the file?</label>
                        <div class="col-md-6">
                            <v-select label="name" :options="availableUsers" multiple required v-model="form.users" :reduce="name => name.nhsNum"/>
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
import { parseAccessPolicy } from "@/components/core/scripts.js"

export default {
  data() {
    return {
        loading: false,
        form: {
            name: '',
            file: '',
            policy:{
                numOfAtrs: 2,
                options:[1,2],
                selected:1,
                buttonsDisabled: true,
                attributes:[{}, {}]
            },
            users: []
        },
        error: null,
        response: null,
        availableUsers: [] 
    }
  },
  async mounted() {
      this.isBusy = true;
        await ApiService.getPatients().then( (res) =>{
            this.availableUsers = res.data;
        }).catch((errr) => {
            console.log(errr);
        });
        this.isBusy = false;
  },
  methods: {
        async submit(){
            this.error = null;
            let NameRE = /^[a-zA-Z0-9 !@#&()`.+,/"-]*$/
            if(!NameRE.exec(this.form.name)){
                this.error = "Title is not valid, please enter only alphanumeric characters or symbols: !@#&()`.+,/\"-"
                return;
            }
            this.response = null;
            this.loading = true;
            let formData = new FormData();
            formData.append("file", this.form.file);
            formData.append("name", this.form.name);
            formData.append("users", this.form.users);
            formData.append("accessPolicy", parseAccessPolicy(this.form.policy));
            await ApiService.uploadFile(formData).then((res) => {
                    this.response = res.data;})
                .catch((errr) => {
                    this.error = errr.response.data;
                });
            this.loading = false;
        },
        handleFileUpload(){
            this.form.file = this.$refs.file.files[0];
        },
        newAttribute(policy){
            policy.attributes.push({});
            policy.numOfAtrs += 1;
             policy.options.push(policy.numOfAtrs);
            if(policy.numOfAtrs > 2){
                policy.buttonsDisabled = false;
            }
            //Force re-render (for sub policy)
            this.form.policy.attributes.push({});
            this.form.policy.attributes.pop();
        },
        removeAttribute(policy, pos){
            policy.attributes.splice(pos, 1);
            policy.options.pop();
            policy.numOfAtrs -= 1;
            if(policy.numOfAtrs <= 2){
                policy.buttonsDisabled = true;
            }
            //Force re-render (for sub policy)
            this.form.policy.attributes.push({});
            this.form.policy.attributes.pop();
        },
        setInputType(attribute, type, policy){
            attribute.type = type;
            if(type=='sub-policy'){
                attribute.value = {
                    numOfAtrs: 2,
                    options:[1,2],
                    selected:1,
                    buttonsDisabled: true,
                    attributes:[{}, {}]
                };
            }
            //Force re-render of v-for
            policy.attributes.push({});
            policy.attributes.pop();
        }

  }

}
</script>
