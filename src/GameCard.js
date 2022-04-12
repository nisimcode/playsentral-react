import React from 'react';
import {Card} from "react-bootstrap";

export class GameCard extends React.Component {

    render() {
        return (
            <Card key={this.props.game.id} style={{width: '30rem', padding: 5, margin: 10}} >
                <Card.Img
                    variant="top" src={this.props.game.picture_url} alt={this.props.game.name + ' image'}
                    style={{display: 'inline-block', width: 150, height: 200,
                            cursor: 'pointer', marginLeft: 120, marginTop: 10}}
                    onClick={() => window.location.href = `games/${this.props.game.id}`}/>
                <Card.Body>
                    <Card.Title>{this.props.game.name}</Card.Title>
                    <Card.Text>{this.props.game.description}</Card.Text>
              </Card.Body>
            </Card>
        )
    }
}
