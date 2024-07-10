import { ref } from "vue";

export function useLoadings(){
    /* Loadings */
    const loadingButton = ref(false);
    const loadingContent = ref(false);

    //Loading functions
    function setLoadingButton(value) {
        loadingButton.value =  value
    }
    //Loading functions
    function setLoadingContent(value) {
        loadingContent.value =  value
    }
    return {
        loadingButton,
        loadingContent,
        setLoadingButton,
        setLoadingContent,
    }
}