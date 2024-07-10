import { defineStore } from "pinia";
import { reactive } from 'vue'
import { useApiService } from '@/Service/testService';
const apiService = useApiService();

export const useCoursesStore =  defineStore('content/courses', {
    state: () => reactive ({
        courses: null,
        course: null,
        res: null
    }),

    getters: {
        getData (){
            return this.courses
        },
        getItem (){
            return this.course
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
                    this.courses =  response?.data;
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Fetch item
        accFetchItem(id) {
            apiService.apiGetCourse(id).then(response => {
                if (response.status === 200) {
                    this.course =  response;
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
                    //this.courses = this.courses.filter(course => course.id !== id);
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
                    this.courses = this.courses.filter(course => course.id !== id);
                }
            }).catch((errors) => {
                this.res =  errors?.response;
            });
        },
        //Reset course and res
        accResetCourse(){
            this.course = null
        },
        accResetRes(){
            this.res = null
        }
    }
})

