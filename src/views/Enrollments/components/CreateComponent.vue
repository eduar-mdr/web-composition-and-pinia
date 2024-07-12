<template>

    <!-- Create Modal -->
    <v-dialog v-model="dialogCreate" max-width="500px" persistent>
            
            <template v-slot:activator="{ props }">
                <!-- New create icon -->
                <div class="text-right pr-4" >
                    <v-btn  color="green-darken-4" dark @click="onCreateItem()">
                        <v-icon
                            class="me-2"
                            size="small"
                            v-bind="props" 
                        >
                        mdi-pencil
                        </v-icon>
                        Crear
                    </v-btn>
                </div>
                <!-- End create icon -->
            </template>

            <!-- Create card -->
            <v-card>
                <v-card-title class="pa-4">
                    <v-icon size="small" color="green-darken-4" class="pb-2">
                    mdi-pencil
                    </v-icon>
                    <span class="text-h6">Crear Item</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-4">
                    <v-container>
                        <v-row no-gutters >

                            <v-col cols="12">
                                <v-text-field maxlength="50" counter clearable color="gray-darken-4"
                                    label="Fecha" v-model="enrollmentDate" ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    clearable
                                    label="Estudiante"
                                    v-model="enrollmentIdStudent"
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
                                <v-select
                                    clearable
                                    label="Curso"
                                    v-model="enrollmentIdCourse"
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

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="gray-darken-4" @click="onDialogCreateCancel()">
                        Cerrar
                    </v-btn>
                    <v-btn 
                        color="green-darken-4" 
                        @click="createItem()" 
                        :loading="loadingButton"
                        :disabled="enrollmentDate && enrollmentIdStudent && enrollmentIdCourse && !loadingStudents && !loadingCourses ? false:true" >
                        Guardar
                    </v-btn>
                </v-card-actions>

            </v-card>

    </v-dialog>
    <!-- End Create Modal -->

    <!-- Alert -->
    <SnackbarAlert 
      v-model="alertState"
      :code="code"
      :message="messageData"
    ></SnackbarAlert>
    <!-- End Alert -->
</template>

<script setup>

import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { useEnrollments } from "../use/useEnrollments";
import { useStudentsStore } from "@/views/Students/store/index";
import { useCoursesStore } from "@/views/Courses/store/index";

    const { 
        loadingButton,
        loadingStudents,
        loadingCourses,
        alertState,
        messageData,
        code,
        onCreateItem,
        dialogCreate,
        onDialogCreateCancel, 
        enrollmentDate,
        enrollmentIdStudent,
        enrollmentIdCourse,
        createItem, 
    } = useEnrollments()

    const studentsStore  = useStudentsStore()
    const coursesStore = useCoursesStore()

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

<style>

</style>