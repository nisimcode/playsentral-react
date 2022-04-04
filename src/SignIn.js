import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import {TOKEN_URL} from "./request_utils";
import {Header} from "./Header";


export class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        // window.localStorage.setItem("username", this.state.username)
        // window.localStorage.setItem("password", this.state.password)
        axios.post(TOKEN_URL, {
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

    render() {
        return(
            <>
            <Header/>
            <Form onSubmit={this.handleSubmit} style={{width: '30%', margin: "auto"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
                &emsp;
                <Button variant="secondary" onClick={() => window.location.href='/signup'}>
                    Not a member yet? Sign up here!
                </Button>
            </Form>
            </>
        )
    }
}

export const WrappedSignIn = props => {

    const navigate = useNavigate()

    return <SignIn navigate={navigate} {...props} />
  }