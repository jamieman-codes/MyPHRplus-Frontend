<template>
  <div class="container">
        <div class="card ">
            <div class="card-header">{{patient['name']}}'s Reminders</div>
            <div class="card-body text-center">
                <div v-if="loading" class="card-body text-center "><b-spinner variant="primary" type="grow" label="Spinning"/></div>
                <div v-else>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        selected: Array
    },
    data(){
        return{
            loading: false,
            patient: this.selected[0]
        }
    }
}
</script>