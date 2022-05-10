import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {GAMES_URL, getToken} from "./request_utils";
import Header from "./Header";
import {GameDetails} from "./GameDetails";
import {GamePosts} from "./GamePosts";
import {GameRating} from "./GameRating";


export class Game extends React.Component {

    constructor(props) {
      super(props)
        this.state = {
            game: [],
      }
}

    getGame() {
        console.log('getting game')
        axios
        .get(GAMES_URL + this.props.gameId + '/details', getToken())
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting game')
            }
            this.setState({game: response.data})
        })}

    componentDidMount() {
        this.getGame()
    }

    render() {
        return(
        <>
            <Header />
            <div style={{display: "flex", flexWrap: 'wrap'}}>
                <div style={{display: "flex", flexWrap: 'wrap', flexDirection: "column"}}>
                <GameDetails game={this.state.game}/>
                    <br/><br/>
                <GameRating gameId={this.props.gameId}/>
                </div>
            <GamePosts gameId={this.props.gameId}/>
            </div>
       </>
      )
    }
  }

export const WrappedGame = props => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    return <Game gameId={gameId} navigate={navigate} {...props} />
}


