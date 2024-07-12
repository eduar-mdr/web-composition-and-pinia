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
                    <v-container v-if="enrollmentsStore.getItem && !loadingContent">
                        <v-row no-gutters >
                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Fecha" v-model="enrollmentsStore.getItem.data.date" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <!-- <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Apellido" v-model="enrollmentsStore.getItem.data.student.name" ></v-text-field> -->
                                <v-select
                                    clearable
                                    label="Estudiante"
                                    v-model="enrollmentsStore.getItem.data.id_student"
                                    :loading="loadingStudents"
                                    :disabled="loadingStudents"
                                    :items="studentsStore.getDataActive? studentsStore.getDataActive : []"
                                    :item-props="itemPropsStudent"
                                >
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props" :title="item.raw.name +' '+ item.raw.last_name" :value="item.raw.id" ></v-list-item>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col cols="12">
                                <!-- <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Correo" v-model="enrollmentsStore.getItem.data.course.name" ></v-text-field> -->
                                <v-select
                                    clearable
                                    label="Curso"
                                    v-model="enrollmentsStore.getItem.data.id_course"
                                    :loading="loadingCourses"
                                    :disabled="loadingCourses"
                                    :items="coursesStore.getDataActive? coursesStore.getDataActive : []"
                                    :item-props="itemPropsCourse"
                                >
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props" :title="item.raw.name" :value="item.raw.id" ></v-list-item>
                                    </template>
                                </v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-switch
                                    :model-value="enrollmentsStore.getItem.data.active? true:false"
                                    name="active"
                                    color="green-darken-3"
                                    hide-details
                                    @click="handleActiveChange(enrollmentsStore.getItem.data.active)"
                                >
                                <template v-slot:label>
                                    <span v-if="enrollmentsStore.getItem.data.active">
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
                    v-if="enrollmentsStore.getItem" 
                    @click="updateItem()" 
                    :loading="loadingButton"
                    :disabled="enrollmentsStore.getItem.data.date && enrollmentsStore.getItem.data.student.name && enrollmentsStore.getItem.data.course.name && !loadingContent && !loadingStudents && !loadingCourses ? false : true"
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

import { useEnrollmentsStore } from "../store/index";
import { useStudentsStore } from "@/views/Students/store/index";
import { useCoursesStore } from "@/views/Courses/store/index";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { useEnrollments } from "../use/useEnrollments";
import { defineProps } from "vue";

    const enrollmentsStore = useEnrollmentsStore()
    const studentsStore  = useStudentsStore()
    const coursesStore = useCoursesStore()
    
    const props = defineProps({
        itemId:{
            type:Number,
            default:null
        }
    })
    console.log(props.itemId);

    const handleActiveChange = ((v)=>{
        enrollmentsStore.getItem.data.active = !v 
    }) 

    const { 
        loadingContent,
        loadingButton,
        loadingStudents,
        loadingCourses,

        alertState,
        messageData,
        code,

        dialogUpdate,
        onDialogUpdateCancel, 
        onUpdateItem,
        updateItem,
    } = useEnrollments()

    const itemPropsStudent = ((item)=>{
        return {
          title: item.name,
          value: item.id
        }
    })
    const itemPropsCourse = ((item)=>{
        return {
          title: item.name,
          value: item.id
        }
    })

</script>