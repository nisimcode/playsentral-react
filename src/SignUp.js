import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {SIGNUP_URL, TOKEN_URL} from "./request_utils";
import Header from "./Header";


export default function SignUp () {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [eMail, setEMail] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res1 = await axios.post(SIGNUP_URL,
                                    {
                                        first_name: firstName,
                                        last_name: lastName,
                                        username: userName,
                                        password: passWord,
                                        email: eMail
                                    })
            if (res1.status === 201) {
                const res2 = await axios.post(TOKEN_URL,
                                        {
                                            username: userName,
                                            password: passWord
                                        })
                window.localStorage.setItem("token", res2.data.token)
                navigate('/')
            }
        } catch(err) {
            // console.error(err)
            window.alert(err)
            }
    }

    return(
        <>
            <Header/>
            <Form onSubmit={handleSubmit} style={{width: '30%', margin: "auto"}}>
                <Form.Group className="mb-3" controlId="formFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose username"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email"
                    value={eMail}
                    onChange={(event) => setEMail(event.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRawPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={passWord}
                    onChange={(event) => setPassWord(event.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                &emsp;
                <Button variant="secondary" onClick={() => window.location.href='/signin'}>
                    Already a member? Sign in here!
                </Button>
            </Form>
        </>
        )
    }
