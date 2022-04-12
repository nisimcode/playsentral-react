import axios from 'axios';
import React from 'react';
import { Button, Form, ListGroup, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import {getHeader, GAMES_URL, JOKES_URL} from './request_utils';
import ReactPaginate from "react-paginate";
import { clone, cloneDeep } from "lodash"
import {Game} from "./Game";
import {SinglePartJoke} from "./SinglePartJoke";
import {TwoPartJoke} from "./TwoPartJoke";

export class Jokes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jokeData: [],
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
                }
                this.setState({jokeData: response.data})
                console.log(this.state.jokeData)
            })
    }

    componentDidMount() {
        this.getJoke()
    }

    render() {
        return (
             <>
            <Header />
            { this.state.jokeData.type === 'single' &&
                <SinglePartJoke jokeData={this.state.jokeData} getJoke={() => this.getJoke()}/>}
            { this.state.jokeData.type === 'twopart' &&
                <TwoPartJoke jokeData={this.state.jokeData} getJoke={() => this.getJoke()}/>}
            </>
        )
    }
}