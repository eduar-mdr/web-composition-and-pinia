import { ref } from "vue";

export function useDialogsState() {

    //Dialog states
    const dialogCreate = ref(false);
    const dialogUpdate = ref(false);
    const dialogDelete = ref(false);

    //Dialog Functions
    function setDialogCreate(value) {
        dialogCreate.value = value
    }
    function setDialogUpdate(value) {
        dialogUpdate.value = value
    }
    function setDialogDelete(value) {
        dialogDelete.value = value
    }

    return {
        dialogCreate,
        dialogUpdate,
        dialogDelete,
        setDialogCreate,
        setDialogUpdate,
        setDialogDelete,
    }
}