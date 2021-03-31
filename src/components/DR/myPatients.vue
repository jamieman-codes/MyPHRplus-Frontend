<template>
    <div class="container" v-if="view == 'main'">
            <div class="card ">
                <div class="card-header">My Patients</div>
                <div class="card-body text-center">
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <b-table striped bordered hover sticky-header :busy="isBusy" :fields="fields" :items="items" select-mode="single" selectable @row-selected="onRowSelected">
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                    </b-table>
                    <p>
                        <b-button pill :disabled="isActive" size="sm" @click="setView('records')">View Records</b-button>
                        <b-button pill :disabled="isActive" size="sm" @click="setView('reminders')">View Reminders</b-button>
                        <b-button pill :disabled="isActive" size="sm" @click="setView('diary')">View Diary</b-button>
                        <b-button pill :disabled="isActive" size="sm" @click="setView('attributes')">View/Edit Attributes</b-button>
                    </p>
                </div>
            </div>
    </div>
    <div class="container" v-else>
        <div class="col-md-4 text-md-left">
            <b-button @click="setView('main')">Back</b-button>
        </div>
        <br>
        <div v-if="view == 'records'">
            <patientRecords :selected="selected"/>
        </div>
        <div v-else-if="view == 'reminders'">
            <patientReminders :selected="selected"/>
        </div>
        <div v-else-if="view == 'diary'">
            <patientDiary :selected="selected"/>
        </div>
        <div v-else-if="view == 'attributes'">
            <patientAttributes :selected="selected"/>
        </div>
    </div>
</template>

<script>
import { ApiService } from "@/components/api.js";
import patientRecords from "@/components/DR/patientRecords";
import patientDiary from "@/components/DR/patientDiary"
import patientReminders from "@/components/DR/patientReminders"
import patientAttributes from "@/components/DR/patientAttributes"

export default {
    data() {
        return {
            error: null,
            isBusy: false,
            isActive: true,
            fields: [
            {
                key: "name",
                sortable: true
            },
            {
                key: "nhsNum",
                label: "NHS Number"
            }
            ],  
            items: [],
            selected: [],
            view: 'main'
        } 
    },
    components:{
        patientRecords,
        patientDiary,
        patientReminders,
        patientAttributes
    },
    methods: {
        onRowSelected(items){
            this.isActive = false;
            this.selected = items;
        },
        setView(option){
            this.view=option;
        }
    },
    async mounted() {
        this.isBusy = true;
        await ApiService.getPatients().then( (res) =>{
            this.items = res.data;
        }).catch((errr) => {
            console.log(errr);
        });
        this.isBusy = false;
    }
}
</script>