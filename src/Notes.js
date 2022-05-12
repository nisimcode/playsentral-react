import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import axios from "axios";
import {GAMES_URL, getToken, JOKES_URL, NOTES_URL} from "./request_utils";

export default function Notes() {

    const [info, setInfo] = useState([])
    const [text, setText] = useState([])

    const handleNote = async () => {
        try {
            const response = await axios.post(NOTES_URL, {info: info, text: text})
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
            <Form style={{width: '30%', margin: "auto"}}>
                <Form.Group className="mb-3" controlId="formInfo">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control type="text" placeholder="Enter your contact info"
                    value={info}
                    onChange={ (event) => setInfo(event.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" placeholder="Enter your message here"
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