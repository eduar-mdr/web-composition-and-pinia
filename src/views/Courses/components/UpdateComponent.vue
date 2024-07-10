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
                    <v-container v-if="courseStore.getItem && !loadingContent">
                        <v-row no-gutters >
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Nombre del curso" v-model="courseStore.getItem.data.name" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Descripción del curso"
                                    v-model="courseStore.getItem.data.description"
                                    name="input-7-1"
                                    variant="filled"
                                    auto-grow
                                    maxlength="50" 
                                    counter clearable color="gray-darken-4" 
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-switch
                                    :model-value="courseStore.getItem.data.active? true:false"
                                    name="active"
                                    color="green-darken-3"
                                    hide-details
                                    @click="handleActiveChange(courseStore.getItem.data.active)"
                                >
                                <template v-slot:label>
                                    <span v-if="courseStore.getItem.data.active">
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
                    v-if="courseStore.getItem" 
                    @click="updateItem()" 
                    :loading="loadingButton"
                    :disabled="courseStore.getItem.data.name && courseStore.getItem.data.description && !loadingContent? false : true"
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

import { useCoursesStore } from "../store/index";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { useCourses } from "../use/useCourses";
import { defineProps } from "vue";

    const courseStore = useCoursesStore()
    //@js-ignore
    const props = defineProps({
        itemId:{
            type:Number,
            default:null
        }
    })
    console.log(props.itemId);

    const handleActiveChange = ((v)=>{
        courseStore.getItem.data.active = !v 
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
    } = useCourses()

</script>