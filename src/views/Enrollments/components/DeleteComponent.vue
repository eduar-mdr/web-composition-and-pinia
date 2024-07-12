<template>
    <!-- Delete Modal -->
    <v-dialog v-model="dialogDelete" max-width="500px" persistent >
        <template v-slot:activator=" {props} ">
        
        <!-- Delete button -->
        <v-icon 
            color="red-accent-2"
            class="me-2"
            size="small"
            v-bind="props" 
            @click="onDeleteItem(itemId)"
            >
            mdi-delete
        </v-icon>
        <!-- End Delete button -->
        </template>

        <v-card>
        <v-card-title class="pa-4">
            <v-icon size="small" color="red-accent-2" class="pb-2">
                mdi-delete
            </v-icon>
            <span class="text-h6" >Eliminar Item</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container v-if="enrollmentsStore.getItem && !loadingContent">
                
                <v-row no-gutters  >
                    <v-col cols="12">
                        El registro: 
                        <b>{{ enrollmentsStore.getItem?.data?.student?.name + ' ' + enrollmentsStore.getItem?.data?.student?.last_name  }} - {{ enrollmentsStore.getItem?.data?.course?.name }}</b>
                        , se eliminará por completo.
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
        <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="gray-darken-4" @click="onDialogDeleteCancel()">
                Cancelar
            </v-btn>
            <v-btn 
                color="green-darken-4"
                @click="deleteItem()" 
                :loading="loadingButton"
                :disabled="enrollmentsStore.getItem && !loadingContent? false: true">
                Eliminar
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

import { useEnrollmentsStore } from "../store/index";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { useEnrollments } from "../use/useEnrollments";
import { defineProps} from "vue";

    const enrollmentsStore = useEnrollmentsStore()
    
    const props = defineProps({
        itemId:{
            type:Number,
            default:null
        }
    })
    console.log("ID: "+props.itemId);

    const { 
        loadingContent,
        loadingButton,
        alertState,
        messageData,
        code,
        dialogDelete,
        onDialogDeleteCancel, 
        onDeleteItem,
        deleteItem,
    } = useEnrollments()


</script>