import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Game} from "./Game";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {GAMES_URL, getToken, POSTS_URL, RATINGS_URL} from "./request_utils";
import RangeSlider from 'react-bootstrap-range-slider';



export class GameRating extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             showBar: false,
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

            <h5 hidden={this.state.avg_rating === 0}>
                This game's current rating average is {+this.state.avg_rating.toFixed(2)}</h5>
            <h5 hidden={this.state.avg_rating !== 0}>
                This game hasn't been rated yet</h5>

            <h6 hidden={this.state.user_rating_score === 0}>
                Your current rating of this game is: {this.state.user_rating_score}</h6>
            <h6 hidden={this.state.user_rating_score !== 0}>
                Your haven't rated this game yet</h6>
            <Button variant={'info'}
                    size={'sm'}
                    style={{width: '120px', height: '28px'}}
                    onClick={() => this.setState({showBar: !this.state.showBar})}>
                {this.state.user_rating_score !== 0 ? 'Change rating' : 'Rate this game'}
            </Button>
            <Form hidden={!this.state.showBar}>
                <Form.Group as={Row}>
                    <Col xs="3">
                        <RangeSlider
                        value={this.state.rating}
                        min={1}
                        max={10}
                        tooltip={'off'}
                        onChange={(event) => this.setState({rating: event.target.value})}
                />
                    </Col>
                    <Col  xs='2'>
                        <Form.Control
                            onChange={undefined}
                            style={{height: '20px'}}
                            value={this.state.rating}/>
                    </Col>
                </Form.Group>
            </Form>
               <Button variant={'outline-primary'}
                    hidden={!this.state.showBar}
                    size={'sm'}
                    style={{width: '120px', height: '30px'}}
                    onClick={() => {this.handleRatingSave(); this.setState({showBar: !this.state.showBar})}}>
                Submit
                </Button>



            {/*<Modal*/}
            {/*    show={this.state.showModal}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Rate Game</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <Form >*/}
            {/*            <Form.Group className="mb-3">*/}
            {/*                <Form.Label>Rate this game</Form.Label>*/}
            {/*                <Form.Text>*/}
            {/*                    <Form.Control*/}
            {/*                        type="text" placeholder="Enter 1-10"*/}
            {/*                        value={this.state.rating}*/}
            {/*                        onChange={(event) => this.setState({rating: event.target.value})}/>*/}
            {/*                </Form.Text>*/}
            {/*            </Form.Group>*/}
            {/*        </Form>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary"*/}
            {/*                onClick={() => this.setState({showModal: false})}>*/}
            {/*            Cancel*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary"*/}
            {/*                onClick={() => {this.setState({showModal: false}); this.handleRatingSave()}}>*/}
            {/*            Save*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
            </>
        )
    }
}
