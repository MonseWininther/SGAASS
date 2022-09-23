import { wait } from '@testing-library/user-event/dist/utils';
import { useState, useEffect } from 'react';
import { Button, Container, Navbar, Table } from 'react-bootstrap';
import './App.css';
import AddStudent from './components/CreateAlumn';
import AttendanceDataService from './services/attendance.services'

function App() {

  const [students, setStudents] = useState([])
  const [id, setId] = useState({})

  const checkIn = async (id) => {
   const r= await AttendanceDataService.checkIn(id)
   refreshPage()
  }
  const checkOut = async (id) => {
   const r= await AttendanceDataService.checkOut(id)
   //refreshPage()
  }
  const updateStudents = (id) => {
    setId(id)
  }
  const getAllAttendances = async (id) => {
  const r= await   AttendanceDataService.getAllAttendances(id)
  }
  const getAllStudents = async () => {
    const data = await AttendanceDataService.getStudents()
    console.log('ahaha', data)
    return setStudents(data)
  }
  const addNewStudent = async () => {
    const newStudent = {
      firstName: '',
      idCurrentAttendances: 0,
      idControl: 0,
      lastName: ''
    }
    const studentCreationResult = await AttendanceDataService.registerStudent(newStudent)
    console.log(studentCreationResult)
    refreshPage()
  }
  const deleteStudents = async (id) => {
   const result= await AttendanceDataService.deleteStudents(id)
    refreshPage()
  }
  const refreshPage = () => {
    window.location.reload(false);
  }
  useEffect(() => {
    getAllStudents()
  }, [id])

  return (
    <div className="App">
      <header className="App-header">

        <Navbar bg="drak" variant="dark" className="header">
          <Container>
            <Navbar.Brand href='#home'>Asistencias📝</Navbar.Brand>
          </Container>
        </Navbar>

        <h3>Área de archivo🗂</h3>

        <AddStudent id={id} />

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>N.Control</th>
              <th>Nombre(s)</th>
              <th>Apellidos</th>
              <th>Ultima asistencia</th>
              <th>Total Asistencias</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.idCurrentAttendances}</td>
                  <th>{}</th>
                  <td>
                    <Button
                      variant="secondary"
                      className="edit"
                      onClick={(e) => checkIn(student.id)}>
                      Entrar
                    </Button>

                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => checkOut(student.id)}>
                      Salir
                    </Button>

                    <Button
                      variant="primary"
                      className="edit"
                      onClick={(e) => updateStudents(student)}>
                      Actualización
                    </Button>

                    <Button variant="danger"
                      className="delete"
                      onClick={(e) => deleteStudents(student.id)}>
                      Eliminar
                    </Button>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <button onClick={getAllAttendances}>Obtener asistencia </button>
        <button onClick={getAllStudents}>Obtener alumnos </button>

      </header>
    </div>
  );
}

export default App;
