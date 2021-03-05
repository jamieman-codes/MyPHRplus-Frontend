<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Create New Data Provider Account</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <div v-else-if="response" class="alert alert-success">{{response}}</div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                <input id="name" type="name"  class="form-control" name="name" value required autofocus v-model="form.name" />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value required autofocus v-model="form.email" />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required v-model="form.password" />
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiService } from "@/components/api.js"

export default {
    data() {
        return {
            error: null,
            response: null,
            form: {
                name: '',
                password: '',
                email: ''
            }
        }
    },
    methods: {
        async submit() {
            this.error = null;
            this.response = null;
            await ApiService.createNewDP(this.form.name, this.form.email, this.form.password).then( (res) => {
                    this.response = res.data
                }).catch((errr) => {
                    this.error= errr.response.data;
                });
        }
    }
}
</script>