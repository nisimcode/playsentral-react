import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import axios from "axios";
import {NOTES_URL} from "./request_utils";
import Header from "./Header";

export default function Notes() {

    const [info, setInfo] = useState([])
    const [text, setText] = useState([])


    const handleNote = async () => {
        try {
            const response = await axios
                .post(NOTES_URL, {info: info, text: text, user: localStorage.getItem('userId')})
            console.log(response)
            if (response.status === 201) {
                window.history.back()
            } else {
                window.alert('Failed, try again')
            }
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <>
            <Header />
            <Form style={{width: '30%', margin: "auto"}}>
                <Form.Group className="mb-3" controlId="formInfo">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter your contact info"
                    value={info}
                    onChange={ (event) => setInfo(event.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter your message here"
                    value={text}
                    onChange={ (event) => setText(event.target.value) }/>
                </Form.Group>

                <Button variant="primary" onClick={handleNote}>
                    Send
                </Button>
            </Form>
        </>
    )

}