<template>
    <div class="container">
        <div class="card ">
            <div class="card-header">My Files</div>
            <div class="card-body text-center">
                <div v-if="view == 'main'" class="row justify-content-center">
                    <div class="col-md-4">
                        <b-button @click="setView('upload')">Upload</b-button>  
                        <b-button @click="setView('download')">Download</b-button>
                    </div>
                </div>
                <div v-else-if="view == 'upload'">
                    <div class="col-md-4 text-md-left">
                        <b-button @click="setView('main')">Back</b-button>
                    </div>
                    <br>
                    <div class="row justify-content-center"><upload/></div>
                </div>
                <div v-else-if="view == 'download'">
                    <div class="col-md-4 text-md-left">
                        <b-button @click="setView('main')">Back</b-button>
                    </div>
                    <br>
                    <div class="row justify-content-center"><download/></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import upload from "@/components/DR/Upload";
import download from "@/components/core/Download";

export default {
    data(){
        return{
            view: 'main'
        }
    },
    components:{
        upload,
        download
    },
    methods:{
        setView(option){
            this.view=option;
        }
    }
}
</script>