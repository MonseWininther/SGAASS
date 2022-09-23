import { useState, useEffect } from "react"
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap"


const studentLogOut = () => {

    const [idControl, setIdControl] = useState("")
    const [firstName, setFirstName] = useState("")
    const [hour, setHour] = useState(Date.now)

    useEffect(() => {

    }, [])
    return (
        <>
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
                            <InputGroup.Text></InputGroup.Text>
                            <FormControl type="text"
                                placeholder="¿Tu nombre es?"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}>
                            </FormControl>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text> Hora: </InputGroup.Text>
                            <FormControl type="Date.Now"
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
            </>
        </>
    )

}
export default studentLogOut