import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import './App.css';
import AttendanceDataService from './services/attendance.services'

function App() {

  const checkIn = (id) => {
    AttendanceDataService.checkIn(id)
  }
  const checkOut = (id) => {
    AttendanceDataService.checkOut(id)
  }
  const getAllAttendances = (id) => {
    AttendanceDataService.getAllAttendances(id)
  }

  const getAllStudents = async () => {
    const data=await AttendanceDataService.getStudents()
    console.log('ahaha',data)
    return setStudents(data)
  }

  const [students, setStudents] = useState([])

  useEffect( () => {
    getAllStudents()
  }, [])

  return (
    <div className="App">
      <header className="App-header">

      
        <button onClick={getAllAttendances}>Obtener asistencia </button>
        <button onClick={getAllStudents}>Obtener alumnos </button>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>N.Control</th>
              <th>Nombre(s)</th>
              <th>Apellido(s)</th>
              <th>Ultima asistencia</th>
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
                  <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => checkIn(student.id)}
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => checkOut(student.id)}
                  >
                    Salir
                  </Button>
              
                </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

      </header>
    </div>
  );
}

export default App;
