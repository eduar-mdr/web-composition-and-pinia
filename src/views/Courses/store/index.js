import { defineStore } from "pinia";
import { reactive } from 'vue'
import { useApiService } from '@/Service/testService';
const apiService = useApiService();

export const useCoursesStore =  defineStore('content/courses', {
    state: () => reactive ({
        data: null,
        dataActive: null,
        item: null,
        res: null
    }),

    getters: {
        getData (){
            return this.data
        },
        getDataActive (){
            return this.dataActive
        },
        getItem (){
            return this.item
        },
        getRes (){
            return this.res
        }
    },

    actions: {
        //Fetch data
        accFetchData() {
            apiService.apiGetCourses().then(response => {
                if (response.status === 200) {
                    this.data =  response?.data;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Fetch active data
        accFetchDataActive() {
            apiService.apiGetCoursesActive().then(response => {
                if (response.status === 200) {
                    this.dataActive =  response?.data;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Fetch item
        accFetchItem(id) {
            apiService.apiGetCourse(id).then(response => {
                if (response.status === 200) {
                    this.item =  response;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Store item
        accStoreItem(data) {
            apiService.apiStoreCourse(data).then(response => {
                if (response.status === 200) {
                    this.res =  response;
                    this.accFetchData()
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Delete item
        accDeleteItem(id) {
            apiService.apiDeleteCourse(id).then(response => {
                if (response.status === 200) {
                    this.res =  response;
                    this.data = this.data.filter(course => course.id !== id);
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Reset course and res
        accResetItem(){
            this.item = null
        },
        accResetRes(){
            this.res = null
        }
    }
})

