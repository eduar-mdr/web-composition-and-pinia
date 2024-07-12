import { ref } from "vue";
import { useEnrollmentsStore } from "../store/index";
import { useStudentsStore } from "@/views/Students/store/index"; //Additional store for students select
import { useCoursesStore } from "@/views/Courses/store/index"; //Additional store for courses select
import { useAlertState } from "@/composables/useAlertState";
import { useLoadings } from "@/composables/useLoaading";
import { useDialogsState } from "@/composables/useDialogsState";
export function useEnrollments(){
    
    //Constants
    //Modular pinia store for enrollments
    const enrollmentStore = useEnrollmentsStore()
    //Modular pina store for students
    const studentsStore = useStudentsStore()
    //Modular pina store for courses
    const coursesStore = useCoursesStore()
    //Notification composable
    const { alertState, messageData, code, setNotification }  = useAlertState()
    /* Loadings composable*/
    const {loadingButton, loadingContent, setLoadingButton, setLoadingContent, loadingCourses, setLoadingCourses, loadingStudents, setLoadingStudents} = useLoadings()
    //Dialog states composable
    const { dialogCreate, dialogUpdate, dialogDelete, setDialogCreate, setDialogUpdate, setDialogDelete } = useDialogsState()

    //New item
    const enrollmentDate = ref('');
    const enrollmentIdStudent = ref(null);
    const enrollmentIdCourse = ref(null);
    const newItem = ref(null);
    //Selected item
    const selectedItem = ref(null);
    const selectedItemData = ref(null);

    //Actions
    function resetForm(){
        enrollmentDate.value = ''
        enrollmentIdStudent.value = null
        enrollmentIdCourse.value = null
        newItem.value = null
    }
    //Dialog Functions
    function onDialogCreateCancel(){
        resetForm()
        setDialogCreate(false)
    }
    function onDialogDeleteCancel(){
        enrollmentStore.accResetItem()
        enrollmentStore.accResetRes()
        setDialogDelete(false)
    }
    function onDialogUpdateCancel(){
        enrollmentStore.accResetItem()
        enrollmentStore.accResetRes()
        setDialogUpdate(false)
    }
    //CRUD actions
    //Create
    async function onCreateItem(){
        setDialogCreate(true)
        getActiveStudents()
        getActiveCourses()
    }
    async function createItem(){
        
        if (enrollmentDate.value && enrollmentIdStudent.value && enrollmentIdCourse.value ) {
            setLoadingButton(true)
            newItem.value = {
                date : enrollmentDate.value,
                id_student : enrollmentIdStudent.value,
                id_course : enrollmentIdCourse.value,
            }
            enrollmentStore.accResetItem()
            enrollmentStore.accStoreItem(newItem.value)
            setTimeout(() => {
                const res = enrollmentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    resetForm()
                    enrollmentStore.accResetRes()
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
                enrollmentStore.accFetchItem(selectedItem.value)

                setTimeout(() => {
                    let res = enrollmentStore.getItem
                    if (!res) {
                        res = enrollmentStore.getRes
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

        if (setSelectedItem(id) === 200 && enrollmentStore.getItem !== null) {
            setDialogDelete(true)
        }

    }
    async function deleteItem(){
        if (selectedItem.value) {
            setLoadingButton(true)
            enrollmentStore.accDeleteItem(selectedItem.value)
            setTimeout(() => {
                const res = enrollmentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                console.log(alertState.value, code.value, messageData.value);
                if (res?.status === 200) {
                    enrollmentStore.accResetItem()
                    enrollmentStore.accResetRes()
                    setDialogDelete(false)
                }
                setLoadingButton(false)
            }, 1000)
        }
    }
    //Update item
    async function onUpdateItem(id){
        /* if (setSelectedItem(id) === 200 && enrollmentStore.getItem !== null) { */
            setSelectedItem(id)
            setDialogUpdate(true)
            getActiveStudents()
            getActiveCourses()
       /*  } */

    }
    async function updateItem(){
        if( selectedItemData.value.date && selectedItemData.value.id_student && selectedItemData.value.id_course){
            setLoadingButton(true)
            enrollmentStore.accStoreItem(selectedItemData.value)
            setTimeout(() => {
                const res = enrollmentStore.getRes
                console.log(res);
                setNotification(true, res?.status, res?.data?.message) //Open Notification
                if (res?.status === 200) {
                    enrollmentStore.accResetItem()
                    enrollmentStore.accResetRes()
                    setDialogUpdate(false)
                }
                setLoadingButton(false)
            }, 1000)
        } else {
            console.log(selectedItemData.value);
            setNotification(true, 300, 'No se pudo realizar la acción')
        }
    }
    //End CRUD actions
    
    //Additional fetches for selects
    function getActiveStudents() {
        
        setLoadingStudents(true)
        studentsStore.accFetchDataActive()

        setTimeout(() => {
            let res = studentsStore.getDataActive
            if (!res) {
                res = studentsStore.getRes
                console.log(res);
                if (res?.status !== 200) {
                    setNotification(true, res?.status, res?.data?.message? res?.data?.message :'No se pudo realizar la acción') //Open Notification
                }
            } 
            setLoadingStudents(false)
            return 200
        }, 1000)
            
    }
    function getActiveCourses() {
        
        setLoadingCourses(true)
        coursesStore.accFetchDataActive()

        setTimeout(() => {
            let res = coursesStore.getDataActive
            if (!res) {
                res = coursesStore.getRes
                console.log(res);
                if (res?.status !== 200) {
                    setNotification(true, res?.status, res?.data?.message? res?.data?.message :'No se pudo realizar la acción') //Open Notification
                }
            } 
            setLoadingCourses(false)
            return  200
        }, 1000)
    }
    //End Additional fetches for selects

    return {
        
        alertState,
        messageData,
        code,

        loadingButton,
        loadingContent,
        loadingStudents,
        loadingCourses,

        setDialogCreate,
        setDialogUpdate,
        setDialogDelete,
        dialogCreate,
        dialogUpdate,
        dialogDelete,

        enrollmentDate,
        enrollmentIdStudent,
        enrollmentIdCourse,
        newItem,

        onCreateItem,
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