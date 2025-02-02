import { useParams,useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import socket from '../socket';

// import io from 'socket.io-client';
// const socket = io("http://localhost:4000",{
//     path: "/socket.io",
//     transports: ["websocket"],
//     rejectUnauthorized: false
// });

const ContractDetails = (props) => {
    const navigate = useNavigate();
    const [formField, setFormField] = useState([]);
    const {id} = useParams();
    // const [validated, setValidated] = useState(false);

    console.log(id)
    // Retrieve the val

    

    
    useEffect(() => {
 
            const getAllData = ()=>{
                axios.get(`http://localhost:4000/post/edit/${id}`).then(res => {
                    setFormField(
                        
                        res.data[0]
                    )
                  })
        }
        
            getAllData()
        
    
    },[id])
    
    const handleSubmitContract = (event) => {
            event.preventDefault();
            const formData = new FormData(event.target)
            const formObject = Object.fromEntries(formData.entries())
            axios.post(`http://localhost:4000/post/update/${id}`, formObject).then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    console.log("Successfully updated")
                    socket.on("pushNotifications", (data) => {
                        console.log("Recieved", data)
                    });
                    navigate('/', { state: { message: "Congratulations!! Contract is final" } })

                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
                socket.off('pushNotifications');
            }).catch(err => {
                console.log(err)
            })
        
        // }
    

        

    }

    const handleChange = (event) => {
        setFormField((prevState) => ({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    return (
        <>
            <div className='container-fluid mt-5 row'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <h3 className='text-center'><b>Contract Edit</b></h3>
                    <Form onSubmit={handleSubmitContract}>
                        <Form.Group>
                            <Form.Label>Contract Title</Form.Label>
                            <Form.Control name="title" type="text" required value={formField.title} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contract Agreement </Form.Label>
                            <Form.Control name="contract_agg" required type="text" value={formField.contract_agg} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contract Owned By</Form.Label>
                            <Form.Control name="whose_created" type="text" required value={formField.whose_created} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contract Status (Already Selected)</Form.Label>
                            <Form.Select name="status" value={formField.status} onChange={handleChange}>
                                <option name="status" value="start" defaultValue>Start</option>
                                <option name="status" value="pending">Pending</option>
                                <option name="status" value="complete">Complete</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Button className="mt-4" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <div className='col-3'></div>
            </div>
        </>
    )
}

export default ContractDetails;