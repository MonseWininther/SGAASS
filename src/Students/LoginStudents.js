import { useState, useEffect } from "react"
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap"


const LoginStudent = () => {
    const [idControl, setIdControl] = useState("")
    const [firstName, setFirstName] = useState("")
    const [hour, setHour] = useState(Date.now)

    useEffect(() => {

    }, [])


    return (
        <>
            <h1>BIENVENIDO 📥</h1>
            <h3> Ingresa solo tu numero de control</h3>
            <div>
                <Form>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Tetx> N.Control: </InputGroup.Tetx>
                            <FormControl
                                type="text"
                                placeholder="Numero de Control"
                                value={idControl}
                                onChange={(e) => setIdControl(e.target.value)}>
                            </FormControl>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Tetx></InputGroup.Tetx>
                            <FormControl
                                type="text"
                                placeholder="¿Tu nombre es?"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}>
                            </FormControl>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Tetx> Hora: </InputGroup.Tetx>
                            <FormControl
                                type="Date.Now"
                                placeholder=""
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}>
                            </FormControl>
                        </InputGroup>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="Submit">
                                Registrar
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>

        </>
    )

}
export default LoginStudent