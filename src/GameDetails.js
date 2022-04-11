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
                    <h1 style={{fontStyle: 'italic'}}>{this.props.game.name}</h1>
                    <img src={this.props.game.picture_url} alt={this.props.game.name + ' image'} height={400} />
                     {/*<Button*/}
                     {/*   variant={'primary'} size={'lg'} style={{width: '60px', height: '30px'}}*/}
                     {/*   onClick={() => this.handleRateGame()}>*/}
                     {/*   Delete*/}
                    {/*</Button>}*/}
                </div>
                &emsp;&emsp;
                <div>
                    <h3>Details</h3>
                    <ListGroup as="ul" style={{width: '250px'}}>
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
                        {/*<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
                        {/*    <div className="ms-2 me-auto">*/}
                        {/*        <div className="fw-bold">Average Rating</div>*/}
                        {/*        {this.props.game.avg_rating ? this.props.game.avg_rating : 'N/A'}*/}
                        {/*    </div>*/}
                        {/*</ListGroup.Item>*/}
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