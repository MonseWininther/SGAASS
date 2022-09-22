import { async } from '@firebase/util'
import { collection, getDocs, Timestamp, addDoc, getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config'



const studentDocumentReference = (idControl) => doc(db, 'students', idControl)
const studentCollectiontReference = () => collection(db, 'students')

const attendanceDocumentReference = (idControl, idAttendance) => doc(db, `students/${idControl}/attendances`, idAttendance)
const attendanceCollectionReference = (idControl) => collection(db, `students/${idControl}/attendances`)


class AttendanceDataService {

    registerStudent = (newStudent) => {
        //Crear Documento con idControl
        return addDoc(studentDocumentReference, newStudent);
        //Con atributos  fristName, lastName
        
    }

    getStudents = async() => {
        const ref = await getDocs(studentCollectiontReference())
        const docs = ref.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        return docs
    }
    deleteStudents = () => {


    }
    //
    checkIn = async (idControl) => {
        try {
            //Obtener las refencias a los documentos de Firesbase
            const attendaceRef = attendanceCollectionReference(idControl)
            const studentDocRef = studentDocumentReference(idControl)

            const seconds = new Date().getTime() / 1000;
            const nanoseconds = 0
            const attendace = { checkIn: new Timestamp(seconds, nanoseconds) }

            //Insertamos una asistencia
            const attendanceInsertionResult = await addDoc(attendaceRef, attendace);
            console.log(attendanceInsertionResult.id)

            //obtenemos al estudiante
            const student = (await getDoc(studentDocRef)).data()
            console.log(student)
            const udatedStuden = { ...student, idCurrentAttendances: attendanceInsertionResult.id }

            //Actualizamos al estudiante agregando el id de la asistencia
            //que acabamos de crear (attendanceInsertionResult)
            const studentResul = await updateDoc(studentDocRef, udatedStuden)
            console.log(studentResul)
        } catch (error) {
            console.log(error)
        }

    }
    checkOut = async (idControl) => {
        //Obtener la referencias del documentos del estudiante 
        const studentDocRef = studentDocumentReference(idControl)

        try {
            //Obtener estudiante
            const student = (await getDoc(studentDocRef)).data()
            console.log(student)
            //Obtener idCurrentAttendances
            const idCurrentAttendances = student.idCurrentAttendances
            //con ese Id buscar coleccion de asistencia donde hay que actualizar
            const attendaceDoc = (await getDoc(attendanceDocumentReference(idControl, idCurrentAttendances))).data()
            //obtener el checkIn 
            const checkIn = attendaceDoc.checkIn
            //Crear checkOut 
            const seconds = new Date().getTime() / 1000;
            const nanoseconds = 0
            const checkOut = new Timestamp(seconds, nanoseconds)
            //Obtener duracion restando checkOut con checkIn
            const duration = checkOut.seconds - checkIn.seconds
            const transform = (duration / 60) / 60
            //Crear objeto nuevo objecto de asitencia
            const result = { ...attendaceDoc, checkOut, duration: transform }
            //Actualizar Docuemtno en Firesbase 
            const attendanceDocRef = attendanceDocumentReference(idControl, idCurrentAttendances)
            const attendaceResult = await updateDoc(attendanceDocRef, result)
            console.log(attendaceResult)

            const udatedStuden = { ...student, idCurrentAttendances: '' }
            const studentResult = await updateDoc(studentDocRef, udatedStuden)
            console.log(studentResult)

        } catch (error) {
            console.log(error)
        }
    }
    getAllAttendances = async (idControl) => {
        const ref = await getDocs(attendanceCollectionReference(idControl))
        const docs = ref.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log(docs)
    }
}
export default new AttendanceDataService()