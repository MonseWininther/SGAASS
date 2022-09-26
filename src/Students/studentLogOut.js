import { QRCodeSVG } from "qrcode.react"
import { useState, useEffect } from "react"
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap"
import attendanceServices from "../services/attendance.services"


const StudentLogOut = () => {

    const [idControl, setIdControl] = useState("")
    const [firstName, setFirstName] = useState("")
    const [date, setDate] = useState(Date.now)

    const sendCheckOut =()=>{
        const result = attendanceServices.checkOut(idControl)
        console.log(result)
        refreshPage()
    }
    const refreshPage = () => {
        window.location.reload(false);
    }
    useEffect(() => {

    }, [])
    return (
        <div className="App-header">
            <> <h1>HASTA LUEGO!!!!📤</h1>
                <h3>Ingresa solo tu numero de control</h3>
                <Form>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Text> N.Control: </InputGroup.Text>
                            <FormControl type="text"
                                placeholder="Numero de Control"
                                value={idControl}
                                onChange={(e) => setIdControl(e.target.value)}>
                            </FormControl>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Nombre</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="¿Tu nombre es?"
                                value={firstName}
                                disabled
                            ></FormControl>
                        </InputGroup>

                      
                        <label>{date}</label>
                     
                       

                        <QRCodeSVG value={date}/>

                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={(e)=> sendCheckOut()}>
                                Registrar
                            </Button>
                        </div>


                    </FormGroup>
                </Form>
            </>
        </div>
    )

}
export default StudentLogOut