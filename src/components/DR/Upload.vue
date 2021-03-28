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

                    <div class="form-row">
                        <label class="col-md-4 col-form-label text-md-right">Access Policy:</label>
                        <div class="form-group">
                            <b-form-select id="inline-form-custom-select-pref" v-model="selected" :options="options" inline></b-form-select>
                        </div>
                        of
                        <div class="form-group">
                            <b-form-spinbutton id="sb-inline" min="2" v-model="chosenNumOfPolcyAtrs" inline></b-form-spinbutton>
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
export default {
  data() {
    return {
        loading: false,
        form: {
            name: '',
            file: '',
            policy: {
                access: '2of4',
                values: ['foo', {
                    access: '1of2',
                    values: ['mar', 'bar']
                }, 
                'poo',
                'wee']
            }
        },
        error: null,
        response: null,
        chosenNumOfPolcyAtrs: 2
    }
  },
  methods: {
      async submit(){},
      handleFileUpload(){
        this.form.file = this.$refs.file.files[0];
      }
  }

}
</script>
