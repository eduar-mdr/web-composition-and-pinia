<template>

    <v-banner
        color="warning"
        icon="$warning"
        lines="one"
        
        >
        <v-banner-text>
        Sin datos banner
        </v-banner-text>
    </v-banner>
</template>

<script >
    //const name = 'NoDataBanner'
    export default {
        name: 'NoDataBanner',
        setup(){
            return {
                name
            }
        }
    }
</script>