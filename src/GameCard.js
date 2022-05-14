import React from 'react';
import { Card } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import axios from "axios";
import {GAMES_URL, getToken} from "./request_utils";
import {GameRating} from "./GameRating";

export default class GameCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMore: false,
            avg_rating: 0
        }
    }

    getRating() {
        axios
        .get(GAMES_URL + this.props.game.id + '/ratings', getToken())
        .then(response => {
            this.setState({
                avg_rating: response.data.avg_rating,
                })
            }
        )
        .catch(error => window.alert(error))
     }

     componentDidMount() {
        this.getRating()
    }

    render() {
        return (
            <Card style={{width: '18rem', padding: 0, margin: 10, borderWidth: 2, borderColor: "lightblue"}}>
                <Card.Img
                    variant="top" src={this.props.game.picture_url} alt={this.props.game.name + ' image'}
                    style={{display: 'inline-block', width: 150, height: 200,
                            cursor: 'pointer', marginLeft: 65, marginTop: 10}}
                    onClick={() => window.location.href = `games/${this.props.game.id}`}/>
                <Card.Body>
                    <Card.Title style={{textAlign: 'center', fontSize: 16}}>
                        {this.props.game.name}
                        &ensp;
                        <p style={{display: 'inline', fontSize: 14}}>
                            &#11088; {this.state.avg_rating ? this.state.avg_rating.toFixed(1) : "N/A"}
                        </p>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    </Card.Subtitle>
                    <Nav.Link style={{textAlign: 'center'}}
                        hidden={this.state.displayMore || !this.props.game.description }
                        onClick={() =>
                            this.setState({displayMore: !this.state.displayMore})}>Show description</Nav.Link>
                    <Card.Text hidden={!this.state.displayMore}>
                        {this.props.game.description}
                    </Card.Text>
                     <Nav.Link
                         hidden={!this.state.displayMore}
                         onClick={() =>
                            this.setState({displayMore: !this.state.displayMore})}>Hide description</Nav.Link>
              </Card.Body>
            </Card>
        )
    }
}
