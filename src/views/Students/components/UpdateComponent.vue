<template>
    <!-- Delete Modal -->
    <v-dialog v-model="dialogUpdate" max-width="500px" persistent >
        <template v-slot:activator=" {props} ">
        
        <!-- Delete button -->
        <v-icon 
            class="me-2"
            size="small"
            v-bind="props" 
            @click="onUpdateItem(itemId)"
            >
            mdi-pencil
        </v-icon>
        <!-- End Delete button -->
        </template>

            <!-- Update card -->
            <v-card>
                <v-card-title class="pa-4">
                    <v-icon size="small" color="green-darken-4" class="pb-2">
                    mdi-pencil
                    </v-icon>
                    <span class="text-h6">Actualizar Item</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container v-if="studentsStore.getItem && !loadingContent">
                        <v-row no-gutters >
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Nombre" v-model="studentsStore.getItem.data.name" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Apellido" v-model="studentsStore.getItem.data.last_name" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Correo" v-model="studentsStore.getItem.data.email" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Fecha de nacimiento" v-model="studentsStore.getItem.data.birthdate" ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-switch
                                    :model-value="studentsStore.getItem.data.active? true:false"
                                    name="active"
                                    color="green-darken-3"
                                    hide-details
                                    @click="handleActiveChange(studentsStore.getItem.data.active)"
                                >
                                <template v-slot:label>
                                    <span v-if="studentsStore.getItem.data.active">
                                    Activo
                                    </span>
                                    <span v-else>
                                    Inactivo
                                    </span>
                                </template>
                                </v-switch>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="loadingContent">
                        <v-progress-circular
                        color="green-darken-4"
                        indeterminate
                        ></v-progress-circular>
                        Cargando...
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-4" >
                    <v-spacer></v-spacer>
                    <v-btn color="gray-darken-4" @click="onDialogUpdateCancel()">
                        Cerrar
                    </v-btn>
                    <v-btn 
                    color="green-darken-4" 
                    v-if="studentsStore.getItem" 
                    @click="updateItem()" 
                    :loading="loadingButton"
                    :disabled="studentsStore.getItem.data.name && studentsStore.getItem.data.last_name && studentsStore.getItem.data.email && studentsStore.getItem.data.birthdate && !loadingContent? false : true"
                    >
                        Actualizar
                    </v-btn>
                </v-card-actions>

            </v-card>

    </v-dialog>
    <!-- End Delete Modal  -->

    <!-- Alert -->
    <SnackbarAlert 
      v-model="alertState"
      :code="code"
      :message="messageData"
    ></SnackbarAlert>
    <!-- End Alert -->


</template>

<script setup>

import { useStudentsStore } from "../store/index";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { useStudents } from "../use/useStudents";
import { defineProps } from "vue";

    const studentsStore = useStudentsStore()
    //@js-ignore
    const props = defineProps({
        itemId:{
            type:Number,
            default:null
        }
    })
    console.log(props.itemId);

    const handleActiveChange = ((v)=>{
        studentsStore.getItem.data.active = !v 
    }) 

    const { 
        loadingContent,
        loadingButton,

        alertState,
        messageData,
        code,

        dialogUpdate,
        onDialogUpdateCancel, 
        onUpdateItem,
        updateItem,
    } = useStudents()

</script>