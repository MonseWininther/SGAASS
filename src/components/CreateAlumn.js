import { useEffect, useState } from "react"
import { Alert, Button, Form, FormControl, InputGroup } from "react-bootstrap"
import attendanceServices from "../services/attendance.services"

const AddStudent = ({ currentSudent }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [idControl, setIdControl] = useState("")
    const [message, setMessage] = useState({ error: false, msg: "" })

    const refreshPage = () => {
        window.location.reload(false);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (firstName === "" || lastName === "" || idControl === "") {
            setMessage({ error: true, msg: "Algún campo vacio" });
            return;
        }
        const newStudent = {
            firstName,
            lastName,
            idControl,
        };
        console.log(newStudent);
        try {
            if (currentSudent !== undefined ) {

                await attendanceServices.updateStudents(currentSudent.id, newStudent);
                setMessage({ error: false, msg: "Actualización correctamente!" });
                refreshPage()
            } else {
                await attendanceServices.registerStudent(newStudent);
                setMessage({ error: false, msg: "Estudiante creado correctamente!" });
                refreshPage()
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setFirstName("");
        setLastName("");
        setIdControl("");

    };
    useEffect(() => {

    }, [])

    const saveStudent = () => {
        if (firstName === "" || lastName === "" || idControl === 0)
            setMessage("Datos Invalidos")
    }

    const handleSetMessageButton = () => {
        setMessage({ error: true, msg: "Error Fatal" })
        setFirstName("")
    }


    return (
        <>
            <div className="box">
                {currentSudent}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <InputGroup>
                            <InputGroup.Text id="firstName"> Nombre(s)</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Nombre(s)"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <InputGroup>
                            <InputGroup.Text id="lastName"> Apellidos </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Apellidos"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="idControl">
                        <InputGroup>
                            <InputGroup.Text id="idControl"> N. Control</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Numero de control"
                                value={idControl}
                                onChange={(e) => setIdControl(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Registrar / Actualizar
                        </Button>

                    </div>
                </Form>
            </div>
            <div className="p-4 box">
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                    >
                        {message?.msg}
                    </Alert>
                )}
            </div>


        </>
    )

}

export default AddStudent