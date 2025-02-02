import Button from "react-bootstrap/Button";
import {Component, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const Contract = () => {
    const [formField, setFormField] = useState([
        {
            title: '',
            contract_aggreement: '',
            contract_owner: '',
            status: 'start'
        }
    ]);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const createContract = () => {
        handleShow();
    }

    const handleSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData(event.target)
            const formObject = Object.fromEntries(formData.entries())
            console.log(formObject)
            axios.post('http://localhost:4000/post', formObject).then((res) => {
                if (res.status === 200) {
                    handleClose()
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                }           
            })
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setFormField([{
            [event.target.name]:event.target.value
        }])
    }


    return (
        <>
            <div>
                <div className="row">
                    <div>
                        <b>Add New Contract by clicking on button - </b>
                        <Button variant="outline-primary" onClick={createContract}>Create Contract</Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Contract Details</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Contract Title</Form.Label>
                                    <Form.Control name="title" type="text" required value={formField.title} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contract Agreement</Form.Label>
                                    <Form.Control name="contract_aggreement" required type="text" value={formField.contract_aggreement} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contract Owned By</Form.Label>
                                    <Form.Control name="contract_owner" type="text" required value={formField.contract_owner} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contract Status (Already Selected)</Form.Label>
                                    <Form.Select name="status" value={formField.status} onChange={handleChange}>
                                        <option value="start" defaultValue>Start</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Button className="mt-4" variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <h3>Powered by Tractus Labs inc.</h3>
                </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Contract;