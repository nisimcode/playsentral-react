import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import {SIGNUP_URL, TOKEN_URL} from "./request_utils";
import {Header} from "./Header";


export class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            email: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        // window.localStorage.setItem("username", this.state.username)
        // window.localStorage.setItem("password", this.state.password)
        axios
            .post(SIGNUP_URL,
                {
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
            })
            .then(result => {
                console.log(result)
                if (result.status === 201) {
                    axios
                        .post(TOKEN_URL,
                            {
                                username: this.state.username,
                                password: this.state.password
                        })
                        .then(result => {
                            window.localStorage.setItem("token", result.data.token)
                            console.log(result)
                            this.props.navigate('/')
                        })
                        .catch(error => window.alert(error))
                    }
            })
            .catch(error => window.alert(error))
    }

    render() {
        return(
            <>
            <Header/>
            <Form onSubmit={this.handleSubmit} style={{width: '30%', margin: "auto"}}>
                <Form.Group className="mb-3" controlId="formFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name"
                    value={this.state.firstname}
                    onChange={(event) => this.setState({firstname: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"
                    value={this.state.lastname}
                    onChange={(event) => this.setState({lastname: event.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose username"
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email"
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRawPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}/>
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
}

export const WrappedSignUp = props => {
    const navigate = useNavigate()
    return <SignUp navigate={navigate} {...props} />
  }