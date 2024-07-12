import { ref } from "vue";
import { useStudentsStore } from "../store/index";
import { useAlertState } from "@/composables/useAlertState";
import { useLoadings } from "@/composables/useLoaading";
import { useDialogsState } from "@/composables/useDialogsState";
export function useStudents(){
    
    //Constants
    //Modular pinia store for Students
    const studentStore = useStudentsStore()
    //Notification composable
    const { alertState, messageData, code, setNotification }  = useAlertState()
    /* Loadings composable*/
    const {loadingButton, loadingContent, setLoadingButton, setLoadingContent} = useLoadings()
    //Dialog states composable
    const { dialogCreate, dialogUpdate, dialogDelete, setDialogCreate, setDialogUpdate, setDialogDelete } = useDialogsState()

    //New item
    const studentName = ref('');
    const studentLastName = ref('');
    const studentEmail = ref('');
    const studentBirthdate = ref('');
    const newItem = ref(null);
    //Selected item
    const selectedItem = ref(null);
    const selectedItemData = ref(null);

    //Actions
    function resetForm(){
        studentName.value = ''
        studentLastName.value = ''
        studentEmail.value = ''
        studentBirthdate.value = ''
        newItem .value = null
    }
    //Dialog Functions
    function onDialogCreateCancel(){
        resetForm()
        setDialogCreate(false)
    }
    function onDialogDeleteCancel(){
        studentStore.accResetItem()
        studentStore.accResetRes()
        setDialogDelete(false)
    }
    function onDialogUpdateCancel(){
        studentStore.accResetItem()
        studentStore.accResetRes()
        setDialogUpdate(false)
    }
    //CRUD actions
    //Create
    async function createItem(){
        
        if (studentName.value && studentLastName.value && studentEmail.value && studentBirthdate.value) {
            setLoadingButton(true)
            newItem.value = {
                name : studentName.value,
                last_name : studentLastName.value,
                email : studentEmail.value,
                birthdate : studentBirthdate.value
            }
            studentStore.accResetItem()
            studentStore.accStoreItem(newItem.value)
            setTimeout(() => {
                const res = studentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    resetForm()
                    studentStore.accResetRes()
                    setDialogCreate(false)
                }
                setLoadingButton(false)
            }, 1000)
        }
        
    }
    //Selected Item
    function setSelectedItem(value) {
        if (Number(value)) {
            selectedItem.value = value
            if (selectedItem.value) {

                console.log(selectedItem.value);
                setLoadingContent(true)
                studentStore.accFetchItem(selectedItem.value)

                setTimeout(() => {
                    let res = studentStore.getItem
                    if (!res) {
                        res = studentStore.getRes
                    } else {
                        selectedItemData.value = res?.data
                    }
                    console.log(res);
                    if (res?.status !== 200) {
                        setNotification(true, res?.status, res?.data?.message? res?.data?.message :'No se pudo realizar la acción') //Open Notification
                    }
                    setLoadingContent(false)
                    return res?.status
                }, 1000)
            }
        }
    }
    //Delete item
    async function onDeleteItem(id){

        if (setSelectedItem(id) === 200 && studentStore.getItem !== null) {
            setDialogDelete(true)
        }

    }
    async function deleteItem(){
        if (selectedItem.value) {
            setLoadingButton(true)
            studentStore.accDeleteItem(selectedItem.value)
            setTimeout(() => {
                const res = studentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                console.log(alertState.value, code.value, messageData.value);
                if (res?.status === 200) {
                    studentStore.accResetItem()
                    studentStore.accResetRes()
                    setDialogDelete(false)
                }
                setLoadingButton(false)
            }, 1000)
        }
    }
    //Update item
    async function onUpdateItem(id){
        if (setSelectedItem(id) === 200 && studentStore.getItem !== null) {
            setDialogUpdate(true)
        }

    }
    async function updateItem(){
        if(selectedItemData.value.name && selectedItemData.value.last_name && selectedItemData.value.email && selectedItemData.value.birthdate){
            setLoadingButton(true)
            studentStore.accStoreItem(selectedItemData.value)
            setTimeout(() => {
                const res = studentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    studentStore.accResetItem()
                    studentStore.accResetRes()
                    setDialogUpdate(false)
                }
                setLoadingButton(false)
            }, 1000)
        } else {
            console.log(selectedItemData.value);
        }
    }

    return {
        
        alertState,
        messageData,
        code,

        loadingButton,
        loadingContent,

        setDialogCreate,
        setDialogUpdate,
        setDialogDelete,
        dialogCreate,
        dialogUpdate,
        dialogDelete,

        studentName,
        studentLastName,
        studentEmail,
        studentBirthdate,
        newItem,
        createItem,
        onDialogCreateCancel,

        setSelectedItem,
        selectedItemData,
        
        deleteItem,
        onDeleteItem,
        onDialogDeleteCancel,

        onUpdateItem,
        onDialogUpdateCancel,
        updateItem,
    }
}