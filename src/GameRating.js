import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {GAMES_URL, getToken, RATINGS_URL} from "./request_utils";
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
        axios
        .get(GAMES_URL + this.props.gameId + '/ratings', getToken())
        .then(response => {
            this.setState({
                avg_rating: response.data.avg_rating,
                user_rating_score: response.data.user_rating_score,
                user_rating_id: response.data.user_rating_id
                })
            }
        )
        .catch(error => window.alert(error))
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
        // console.log(`${RATINGS_URL + this.state.user_rating_id}`)
        // console.log("handleEditPost")
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
            .catch(error => window.alert(error))
            // console.log(this.state.posts)
            this.setState({rating: ''})
    }


     handleNewRating () {
        // console.log("handleNewRating")
        axios
            .post(
            GAMES_URL + this.props.gameId + '/ratings',
            {rating: this.state.rating, game: this.props.gameId},
            getToken()
            )
            .then(response => {
            if (response.status === 201) {
                // console.log("Added new rating")
                this.getRating()
            }})
            this.setState({rating: ''})
     }

    render() {
        return (
            <div style={{marginTop: 10}}>
                { this.state.avg_rating !== 0 &&
                <h5>
                    Rating average: {+this.state.avg_rating.toFixed(2)}
                </h5> }
                { this.state.avg_rating === 0 &&
                <h5>
                    No ratings yet
                </h5> }

                { this.state.user_rating_score !== 0 &&
                <h6>
                    Your current rating: {this.state.user_rating_score}
                </h6> }
                 { this.state.user_rating_score === 0 &&
                <h6>
                    Your haven't rated this game
                </h6> }

                <Button variant={'info'}
                        size={'sm'}
                        style={{width: '120px', height: '28px'}}
                        onClick={() => this.setState({showBar: !this.state.showBar})}>
                    {this.state.user_rating_score !== 0 ? 'Change rating' : 'Rate this game'}
                </Button>
                { this.state.showBar &&
                <Form>
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
                                onChange={() => {}}
                                style={{height: '20px'}}
                                value={this.state.rating}/>
                        </Col>
                    </Form.Group>
                </Form> }
                   <Button variant={'outline-primary'}
                        hidden={!this.state.showBar}
                        size={'sm'}
                        style={{width: '120px', height: '30px'}}
                        onClick={() => {this.handleRatingSave(); this.setState({showBar: !this.state.showBar})}}>
                    Submit
                    </Button>
            </div>
        )
    }
}
