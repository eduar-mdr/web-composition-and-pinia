import ApiService from "./apiService";

export const useApiService = (
  
  'apiService', () => {

    /* Course endpoints */
    async function apiGetCourses(params){
        return ApiService.fetchData({
            url: 'course/courses',
            method: 'GET',
            params
        })
    }
    async function apiGetCourse(id){
        return ApiService.fetchData({
            url: 'course/courses/' + id,
            method: 'GET'
        });
    }
    async function apiGetCoursesActive(id){
        let url = 'course/courses-active/';

        if (id) {
            url = 'course/courses-active/'+id;
        } 
        return ApiService.fetchData({
            url: url,
            method: 'GET'
        })
    }
    async function apiStoreCourse(data){
        let url = 'course/courses';
        let method = 'POST';
    
        if (data.id) {
            url = 'course/courses/' + data.id;
            method = 'PATCH';
        }
    
        return ApiService.fetchData({
            url: url,
            method: method,
            data
        })
    }
    
    async function apiDeleteCourse(id){
        return ApiService.fetchData({
            url: 'course/courses/' + id,
            method: 'DELETE'
        })
    }
    /* End Course endpoints */

    /* Student endpoints */
    async function apiGetStudents(params){
        return ApiService.fetchData({
            url: 'student/students',
            method: 'GET',
            params
        })
    }
    async function apiGetStudent(id){
        return ApiService.fetchData({
            url: 'student/students/' + id,
            method: 'GET'
        });
    }
    async function apiGetStudentsActive(id){
        let url = 'student/students-active/';

        if (id) {
            url = 'student/students-active/'+id;
        } 
        return ApiService.fetchData({
            url: url,
            method: 'GET'
        })
    }
    async function apiStoreStudent(data){
        let url = 'student/students';
        let method = 'POST';
    
        if (data.id) {
            url = 'student/students/' + data.id;
            method = 'PATCH';
        }
    
        return ApiService.fetchData({
            url: url,
            method: method,
            data
        })
    }
    
    async function apiDeleteStudent(id){
        return ApiService.fetchData({
            url: 'student/students/' + id,
            method: 'DELETE'
        })
    }
    /* End Student endpoints */

    /* Enrollment endpoints */
    async function apiGetEnrollments(params){
        return ApiService.fetchData({
            url: 'enrollment/enrollments',
            method: 'GET',
            params
        })
    }
    async function apiGetEnrollment(id){
        return ApiService.fetchData({
            url: 'enrollment/enrollments/' + id,
            method: 'GET'
        });
    }
    async function apiGetEnrollmentsActive(id){
        let url = 'enrollment/enrollments-active/';

        if (id) {
            url = 'enrollment/enrollments-active/'+id;
        } 
        return ApiService.fetchData({
            url: url,
            method: 'GET'
        })
    }
    async function apiStoreEnrollment(data){
        let url = 'enrollment/enrollments';
        let method = 'POST';
    
        if (data.id) {
            url = 'enrollment/enrollments/' + data.id;
            method = 'PATCH';
        }
    
        return ApiService.fetchData({
            url: url,
            method: method,
            data
        })
    }
    
    async function apiDeleteEnrollment(id){
        return ApiService.fetchData({
            url: 'enrollment/enrollments/' + id,
            method: 'DELETE'
        })
    }
    /* End Enrollment endpoints */

    return {
      apiGetCourses,
      apiGetCourse,
      apiGetCoursesActive,
      apiStoreCourse,
      apiDeleteCourse,

      apiGetStudents,
      apiGetStudent,
      apiGetStudentsActive,
      apiStoreStudent,
      apiDeleteStudent,

      apiGetEnrollments,
      apiGetEnrollment,
      apiGetEnrollmentsActive,
      apiStoreEnrollment,
      apiDeleteEnrollment,
    };

  }

)