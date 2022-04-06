import axios from 'axios';
import React from 'react';
import { Button, Form, ListGroup, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import {getHeader, GAMES_URL, JOKES_URL} from './request_utils';
import ReactPaginate from "react-paginate";
import { clone, cloneDeep } from "lodash"
import {Game} from "./Game";

export class Jokes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            joke: [],
            hidden: true
        }

    }

    getJoke() {
        console.log('getting a random joke')
        axios
            .get(JOKES_URL)
            .then(response => {
                console.log(response)
                if (response.status !== 200) {
                    console.log('failed getting joke');
                } else {
                    this.setState({joke: response.data, hidden: true})
                    console.log(this.state.joke)
                }
            })
    }

    componentDidMount() {
        this.getJoke()
    }

    render() {
        return (
             <>
            <Header />
            <Container>
            { this.state.joke.setup &&
            <h4>{this.state.joke.setup}</h4> }
                 <br/>
             { this.state.joke.setup &&
             <Button variant="outline-dark" type="button" size="sm" onClick={() => this.setState({hidden: !this.state.hidden})}>
                 {this.state.hidden ? 'Reveal punchline' : 'Hide punchline'}
            </Button> }
                 <br/><br/>
            <h4 hidden={this.state.hidden}>{this.state.joke.delivery}
                &emsp;
                <img src={'joke.png'} alt={'laughing emoticon'} width={50}/>
            </h4>
                 <br/>
            <Button hidden={this.state.hidden} variant="success" type="button" onClick={() => this.getJoke()}>
                 Want another joke?
            </Button>
            <Button hidden={this.state.joke.setup} variant="danger" type="button" onClick={() => this.getJoke()}>
                 Oopsie! Let's try again...
            </Button>
            </Container>


        </>
        )
    }
}