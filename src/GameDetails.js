import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {GameRating} from "./GameRating";

export class GameDetails extends React.Component {


    render() {
        return (
            <>
            <Container style={{display: "flex"}}>
                <div>
                    <h2 style={{fontStyle: 'italic'}}>{this.props.game.name}</h2>
                    <img src={this.props.game.picture_url} alt={this.props.game.name + ' image'} height={380} />
                </div>
                <div style={{margin: 20, marginTop: 5, width: '250px', maxHeight: '400px'}}>
                    <h3>Details</h3>
                    <ListGroup as="ul" >
                        <ListGroup.Item
                            as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Name</div>
                                {this.props.game.name}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Publisher</div>
                                {this.props.game.publisher}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Developer</div>
                                {this.props.game.developer}
                            </div>
                        </ListGroup.Item>
                        { this.props.game.series !== "" &&
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Series</div>
                                  {this.props.game.series}
                            </div>
                        </ListGroup.Item>}
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                  <div className="fw-bold">Release Year</div>
                                  {this.props.game.release_year}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Genre</div>
                                {this.props.game.genre}
                            </div>
                        </ListGroup.Item>
                     </ListGroup>
                </div>
            </Container>
            </>

        )
    }
}

// export const WrappedGameDetails = props => {
//     const {gameId} = useParams()
//     const navigate = useNavigate()
//     return <GameDetails gameId={gameId} navigate={navigate} {...props} />
//
// }