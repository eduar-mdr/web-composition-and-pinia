import { defineStore } from "pinia";
import { reactive } from 'vue'
import { useApiService } from '@/Service/testService';
const apiService = useApiService();

export const useStudentsStore =  defineStore('content/students', {
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
            apiService.apiGetStudents().then(response => {
                if (response.status === 200) {
                    this.data =  response?.data;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Fetch active data
        accFetchDataActive() {
            apiService.apiGetStudentsActive().then(response => {
                if (response.status === 200) {
                    this.dataActive =  response?.data;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Fetch item
        accFetchItem(id) {
            apiService.apiGetStudent(id).then(response => {
                if (response.status === 200) {
                    this.item =  response;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Store item
        accStoreItem(data) {
            apiService.apiStoreStudent(data).then(response => {
                if (response.status === 200) {
                    this.res =  response;
                    this.accFetchData() //Fetch data again, think in changing just local data
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Delete item
        accDeleteItem(id) {
            apiService.apiDeleteStudent(id).then(response => {
                if (response.status === 200) {
                    this.res =  response;
                    this.data = this.data.filter(student => student.id !== id);
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Reset data and res
        accResetItem(){
            this.item = null
        },
        accResetRes(){
            this.res = null
        }
    }
})

