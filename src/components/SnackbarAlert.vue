<template>

  <!-- Alert -->
  <v-snackbar
    :v-model=alertState
    :code=code 
    timeout=3000 
    :color="code==200? 'green-accent-2' : 'red-accent-2'"
    vertical
    multi-line
    >

        <div class="text-subtitle-1 pb-1"> 
            <v-icon
                :icon="code == 200? 'mdi-check-bold': 'mdi-alert'"
                size="small"
                center
                class="pl-3"
            ></v-icon>
            <span v-if="code == 200" class="pl-3">Ok</span>
            <span v-else class="pl-3">Error</span>
        </div>

        <div v-if=" typeof message === 'object'" class="text-subtitle-1 pl-8">
            <div v-for="m in message" :key="m">
                <ul v-for="e in m" :key="e">
                    <li :key={e}>{{ e }}</li>
                </ul>
            </div>
        </div>

        <div v-else class="text-subtitle-1 pl-8">
            <p>{{ message }}</p>
        </div>
    
  </v-snackbar>
  <!-- End Alert -->

</template>
<script>

export default {
    name: 'SnackbarAlert',
    props:{
        alertState: Boolean, 
        code: Number,
        message: Object,
    },
    data(){
        return {
            snackbar:false
        }
    }
}
</script>
<style>

</style>