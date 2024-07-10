<template>
    <v-container :fluid=false>
        <h1 class="text-grey-darken-1">Bienvenido/a</h1>
        <h2 class="text-grey-lighten-1">Registro académico</h2>
        <v-divider></v-divider>
        <v-text class="">
            Vue Js App implementing:
        </v-text>
        <v-list class="pl-6">
            <v-list-item>Composition API</v-list-item>
            <v-list-item>Vue (^3.2.13)</v-list-item>
            <v-list-item>Vue Router (^4.0.3)</v-list-item>
            <v-list-item>Vuetify (3.0.0-beta.0)</v-list-item>
            <v-list-item>Axios (^1.7.2)</v-list-item>
            <v-list-item>Pinia (^2.1.7)</v-list-item>
        </v-list>
    </v-container>
</template>

<script>
export default {
    name: 'HomeView'
}
</script>