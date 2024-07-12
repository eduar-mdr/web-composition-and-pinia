import { ref } from "vue";

export function useLoadings(){
    /* Loadings */
    const loadingButton = ref(false);
    const loadingContent = ref(false);

    /* Select Loadings */
    const loadingStudents = ref(false);
    const loadingCourses = ref(false);

    //Loading functions
    function setLoadingButton(value) {
        loadingButton.value =  value
    }
    function setLoadingContent(value) {
        loadingContent.value =  value
    }
    //Loading functions for selects
    function setLoadingStudents(value) {
        loadingStudents.value =  value
    }
    function setLoadingCourses(value) {
        loadingCourses.value =  value
    }

    return {
        loadingButton,
        loadingContent,
        setLoadingButton,
        setLoadingContent,

        loadingStudents,
        loadingCourses,
        setLoadingStudents,
        setLoadingCourses,
    }
}