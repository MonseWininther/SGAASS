import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap"
import attendanceServices from "../services/attendance.services"



const Hello = () => {
    const [idControl, setIdControl] = useState("")
    const [firstName, setFirstName] = useState("")
    const [date, setDate] = useState(Date.now)

    const sendCheckIn = (idControl) =>{
        const result = attendanceServices.checkIn(idControl)
        console.log(result)
        refreshPage()
    }


    const refreshPage = () => {
        window.location.reload(false);
    }

    return (
        <>
            <div className="App-header">
                <h1>BIENVENIDO 📥</h1>
                <h3> Ingresa tu numero de control</h3>
                <div>
                    <Form>
                        <FormGroup>

                            <InputGroup>
                                <InputGroup.Text>N.Control:</InputGroup.Text>
                                <FormControl
                                    type="text"
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


                            <QRCodeSVG values={date} />

                            <div className="d-grid gap-2">
                                <Button variant="primary"  onClick={(e) => sendCheckIn(idControl)}>
                                    Registrar
                                </Button>
                            </div>

                        </FormGroup>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Hello