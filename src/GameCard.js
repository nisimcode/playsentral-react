import React from 'react';
import { Card } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'

export default class GameCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMore: false,
        }
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
                    <Card.Title style={{textAlign: 'center'}}>{this.props.game.name}</Card.Title>
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
