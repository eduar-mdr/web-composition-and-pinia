<template>

    <!-- Create Modal -->
    <v-dialog v-model="dialogCreate" max-width="500px" persistent>
            
            <template v-slot:activator="{ props }">
                <!-- New create icon -->
                <div class="text-right pr-4" >
                    <v-btn  color="green-darken-4" dark  @click="setDialogCreate(true)">
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
                                    label="Nombre del curso" v-model="courseName" ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Descripción del curso"
                                    v-model="courseDescription"
                                    name="input-7-1"
                                    variant="filled"
                                    auto-grow
                                    maxlength="50" 
                                    counter clearable color="gray-darken-4" 
                                ></v-textarea>
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
                        :disabled="courseName && courseDescription? false:true" >
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
    import { useCourses } from "../use/useCourses";
    const { 
        loadingButton,
        alertState,
        messageData,
        code,
        dialogCreate,
        setDialogCreate,
        onDialogCreateCancel, 
        courseName, 
        courseDescription, 
        createItem, 
    } = useCourses()

</script>

<style>

</style>