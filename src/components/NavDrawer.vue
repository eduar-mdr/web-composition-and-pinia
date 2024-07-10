<template>

    <v-navigation-drawer 
        class="bg-grey-lighten-2" 
        theme="dark" 
        :v-show="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        persistent
        >

        <v-list-item title="Vue Js App" subtitle=""></v-list-item>
        <v-divider> </v-divider>

        <v-list-item link to="/" title="Inicio" prepend-icon="mdi-home"></v-list-item>

        <v-list-item title="Opciones" subtitle=""></v-list-item>
        <v-divider> </v-divider>
        <v-list-item link to="/test/students" title="Estudiantes" prepend-icon="mdi-widgets"></v-list-item>
        <v-list-item link to="/test/courses" title="Cursos" prepend-icon="mdi-widgets"></v-list-item>
        <v-list-item link to="/test/enrollments" title="Inscripciones" prepend-icon="mdi-widgets"></v-list-item>
        <!-- Delete later -->
        <v-list-item title="Sesión" subtitle=""></v-list-item>
        <v-divider> </v-divider>
        <v-list-item link to="/auth/login" title="Login" prepend-icon="mdi-login"></v-list-item>
        <v-list-item link to="/auth/register" title="Register" prepend-icon="mdi-account"></v-list-item>

        <template v-slot:append>
            <div class="pa-4">
            <v-btn block class="bg-grey-lighten-4" prepend-icon="mdi-login" >
                Salir
            </v-btn>
            </div>
        </template>

    </v-navigation-drawer>

</template>
<script>

export default {
    name: "NavDrawer",
    props:{
        drawer:Boolean
    }
}

</script>

<style>

</style>