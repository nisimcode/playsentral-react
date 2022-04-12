import React, {Component} from 'react';
import {Button} from "react-bootstrap";

export class TwoPartJoke extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: true
        }

    }
    render() {
        return (
            <>
            <h5>{this.props.jokeData.setup}</h5>
                 <br/>
             <Button variant="outline-dark"
                     type="button"
                     size="sm"
                     onClick={() => this.setState({hidden: !this.state.hidden})}>
                 {this.state.hidden ? 'Reveal punchline' : 'Hide punchline'}
            </Button>
                 <br/><br/>
            <h5 hidden={this.state.hidden}>
                {this.props.jokeData.delivery}
                &emsp;
                <img src={'joke.png'}
                     alt={'laughing emoticon'}
                     width={50}/>
            </h5>
                 <br/>
            <Button hidden={this.state.hidden}
                    variant="success"
                    type="button"
                    onClick={() => {this.props.getJoke(); this.setState({hidden: true})}}>
                 Get another joke
            </Button>
            </>
        )
    }
}

