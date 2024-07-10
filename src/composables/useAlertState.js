import { ref } from "vue";

export function useAlertState() {
    //Notification 
    const alertState = ref(false);
    const messageData = ref(null);
    const code = ref(null);
      
    const setNotification =  (state, status, message = 'Acción realizada') => {
        alertState.value = state
        code.value = status
        messageData.value = message
    }

    return {
        alertState,
        messageData,
        code,
        setNotification
    }
}