import React, {Component} from 'react';
import {Button} from "react-bootstrap";

export class SinglePartJoke extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    render() {
        return (
            <>
            <h5>{this.props.jokeData.joke}
                &emsp;
                <img src={'joke.png'}
                 alt={'laughing emoticon'}
                 width={50}/>
            </h5>
            <br/>
            <Button variant="success"
                    type="button"
                    onClick={() => this.props.getJoke()}>
                 Get another joke
            </Button>
            </>
        );
    }
}

