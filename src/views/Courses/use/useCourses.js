import { ref } from "vue";
import { useCoursesStore } from "../store/index";
import { useAlertState } from "@/composables/useAlertState";
import { useLoadings } from "@/composables/useLoaading";
import { useDialogsState } from "@/composables/useDialogsState";
export function useCourses(){
    
    //Constants
    //Modular pinia store for courses
    const courseStore = useCoursesStore()
    //Notification composable
    const { alertState, messageData, code, setNotification }  = useAlertState()
    /* Loadings composable*/
    const {loadingButton, loadingContent, setLoadingButton, setLoadingContent} = useLoadings()
    //Dialog states composable
    const { dialogCreate, dialogUpdate, dialogDelete, setDialogCreate, setDialogUpdate, setDialogDelete } = useDialogsState()

    //New item
    const courseName = ref('');
    const courseDescription = ref('');
    const newItem = ref(null);
    //Selected item
    const selectedItem = ref(null);
    const selectedItemData = ref(null);

    //Actions
    function resetForm(){
        courseName.value = ''
        courseDescription.value = ''
        newItem .value = null
    }
    //Dialog Functions
    function onDialogCreateCancel(){
        resetForm()
        setDialogCreate(false)
    }
    function onDialogDeleteCancel(){
        courseStore.accResetCourse()
        courseStore.accResetRes()
        setDialogDelete(false)
    }
    function onDialogUpdateCancel(){
        courseStore.accResetCourse()
        courseStore.accResetRes()
        setDialogUpdate(false)
    }
    //CRUD actions
    //Create
    async function createItem(){
        
        if (courseName.value && courseDescription.value) {
            setLoadingButton(true)
            newItem.value = {
                name : courseName.value,
                description : courseDescription.value
            }
            courseStore.accResetCourse()
            courseStore.accStoreItem(newItem.value)
            setTimeout(() => {
                const res = courseStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    resetForm()
                    courseStore.accResetRes()
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
                courseStore.accFetchItem(selectedItem.value)

                setTimeout(() => {
                    let res = courseStore.getItem
                    if (!res) {
                        res = courseStore.getRes
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

        if (setSelectedItem(id) === 200 && courseStore.getItem !== null) {
            setDialogDelete(true)
        }

    }
    async function deleteItem(){
        if (selectedItem.value) {
            setLoadingButton(true)
            courseStore.accDeleteItem(selectedItem.value)
            setTimeout(() => {
                const res = courseStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                console.log(alertState.value, code.value, messageData.value);
                if (res?.status === 200) {
                    courseStore.accResetCourse()
                    courseStore.accResetRes()
                    setDialogDelete(false)
                }
                setLoadingButton(false)
            }, 1000)
        }
    }
    //Update item
    async function onUpdateItem(id){
        if (setSelectedItem(id) === 200 && courseStore.getItem !== null) {
            //setLoadingContent(true)
            setDialogUpdate(true)
        }

    }
    async function updateItem(){
        if(selectedItemData.value.name && selectedItemData.value.description){
            setLoadingButton(true)
            courseStore.accStoreItem(selectedItemData.value)
            setTimeout(() => {
                const res = courseStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    courseStore.accResetCourse()
                    courseStore.accResetRes()
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

        courseName,
        courseDescription,
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