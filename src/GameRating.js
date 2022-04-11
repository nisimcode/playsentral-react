import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Game} from "./Game";
import {Button, Form, FormControl} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {GAMES_URL, getToken, POSTS_URL, RATINGS_URL} from "./request_utils";

export class GameRating extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             showModal: false,
             avg_rating: 0,
             user_rating_score: 0,
             user_rating_id: 0,
             rating: ''
         }
     }

     getRating() {
        console.log('getting game rating')
        axios
        .get(GAMES_URL + this.props.gameId + '/ratings', getToken())
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting game')
            }
            this.setState({
                avg_rating: response.data.avg_rating,
                user_rating_score: response.data.user_rating_score,
                user_rating_id: response.data.user_rating_id
                })
        })
     }

     componentDidMount() {
         this.getRating()
     }

    handleRatingSave () {
         if (this.state.user_rating_score !== 0) {
             this.handleEditRating()
         } else {
             this.handleNewRating()
         }

     }

     handleEditRating () {
        console.log(`${RATINGS_URL + this.state.user_rating_id}`)
        console.log("handleEditPost")
        axios
            .put(
                RATINGS_URL + this.state.user_rating_id,
                {rating: this.state.rating, game: this.props.gameId},
                getToken())
            .then(response => {
                if (response.status === 204) {
                    this.getRating()
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            console.log(this.state.posts)
            this.setState({rating: ''})
    }


     handleNewRating () {
        console.log("handleNewRating")
        axios
            .post(
            GAMES_URL + this.props.gameId + '/ratings',
            {rating: this.state.rating, game: this.props.gameId},
            getToken()
            )
            .then(response => {
            if (response.status === 201) {
                console.log("Added new rating")
                this.getRating()
            }})
            this.setState({rating: ''})
            console.log(this.state.posts)
     }

    render() {
        return (
            <>
            { this.state.avg_rating !== 0 &&
            <h5>This game's current rating average is {+this.state.avg_rating.toFixed(2)}</h5>}
            { this.state.user_rating_score !== 0 &&
            <h6>Your current rating of this game is: {this.state.user_rating_score}</h6>}

            <Button variant={'info'} size={'sm'} style={{width: '120px', height: '30px'}}
                    onClick={() => this.setState({showModal: true})}>
                Rate this game
            </Button>
            <Modal
                show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Rate this game</Form.Label>
                            <Form.Text>
                                <Form.Control
                                    type="text" placeholder="Enter 1-10"
                                    value={this.state.rating}
                                    onChange={(event) => this.setState({rating: event.target.value})}/>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={() => this.setState({showModal: false})}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                            onClick={() => {this.setState({showModal: false}); this.handleRatingSave()}}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}
