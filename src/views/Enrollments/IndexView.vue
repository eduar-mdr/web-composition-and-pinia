<template>
    <v-container>
        <!-- <h1 class="text-grey-darken-1">Inscipciones</h1> -->
        <!-- <h2 class="text-grey-lighten-1">Contenido</h2> -->

        <!-- Entries table -->
        <v-data-table
            :headers="headers"
            :items="enrollmentsStore.getData? enrollmentsStore.getData : []"
            density="compact"
            item-key="date"
            :sort-by="[{ key: 'date', order: 'asc' }]"
            >

            <template v-slot:top>
                <v-toolbar flat>
                <v-toolbar-title>Inscripciones</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <!-- Create component-->
                <CreateComponent></CreateComponent>
                <!-- End Create -->
                </v-toolbar>
            </template>

            <template v-slot:item.active="{ item }"> <!-- eslint-disable-line vue/valid-v-slot -->
                {{ item?.active? 'Activo' : 'Inactivo' }}
            </template>

            <template v-slot:item.actions="{ item }"> <!-- eslint-disable-line vue/valid-v-slot -->
                <!-- Update component -->
                <UpdateComponent :itemId="item?.id" ></UpdateComponent>
                <!-- Delete component -->
                <DeleteComponent :itemId="item?.id" ></DeleteComponent>
            </template>

            <template v-slot:no-data>
                <v-banner
                color="warning"
                icon="$warning"
                lines="one"
                class="mb-2 mt-2"
                >
                <v-banner-text>
                    Sin datos
                </v-banner-text>
                </v-banner>
            </template>
            
        </v-data-table>
        <!-- End Entries table -->

    </v-container>
</template>
  
<script setup>

import { useEnrollmentsStore } from "./store/index";
import CreateComponent from "./components/CreateComponent.vue";
import  DeleteComponent  from "./components/DeleteComponent.vue";
import  UpdateComponent  from "./components/UpdateComponent.vue";
    
import { onMounted } from "vue";

  const enrollmentsStore = useEnrollmentsStore()
  
  const headers =  [
    { title: 'Fecha', align: 'start', key: 'date' },
    { title: 'Nombre', align: 'start', key: 'student.name' },
    { title: 'Apellido', align: 'start', key: 'student.last_name' },
    { title: 'Curso', align: 'start', key: 'course.name' },
    { title: 'Estado', align: 'start', key: 'active' },
    { title: 'Acciones', align: 'start', sortable: false, key: 'actions' },
  ]
  onMounted(()=>{
    enrollmentsStore.accFetchData()
  })

  </script>