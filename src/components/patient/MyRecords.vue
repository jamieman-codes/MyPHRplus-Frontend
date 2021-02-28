<template>
    <div class="container">
        <div class="card ">
            <div class="card-header">MyRecords</div>
            <div class="card-body text-center">
                <div v-if="view == 'main'" class="row justify-content-center">
                    <div class="col-md-4">
                        <b-button @click="setView('upload')">Upload</b-button>
                        <b-button>Download</b-button>
                    </div>
                </div>
                <div v-else-if="view == 'upload'">
                    <b-button @click="setView('main')">Back</b-button>
                    <div class="row justify-content-center"><upload></upload></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import upload from "@/components/patient/Upload";

export default {
    data(){
        return{
            view: 'main'
        }
    },
    components:{
        upload
    },
    methods:{
        setView(option){
            this.view=option;
        }
    }
}
</script>