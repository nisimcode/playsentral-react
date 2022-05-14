import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import {GAMES_URL, getToken} from "./request_utils";
import {GameDetails} from "./GameDetails";
import {GamePosts} from "./GamePosts";
import {GameRating} from "./GameRating";
import {useParams} from "react-router-dom";


export default function Game() {

    const {gameId} = useParams()
    const [game, setGame] = useState([])

    const getGame = () => {
        axios
            .get(GAMES_URL + gameId + '/details', getToken())
            .then(response => {
                    if (response.status === 200) {
                        setGame(response.data)
                    } else {
                        window.alert('Error! Contact us!')
                    }
                })
            .catch(error => {
                window.alert(error)
            })
    }

     useEffect(() =>{
        getGame()
        }, []
    )

    return(
        <>
            <Header />
            <div style={{display: "flex", flexWrap: 'wrap'}}>
                <div style={{display: "flex", flexWrap: 'wrap', flexDirection: "column"}}>
                <GameDetails game={game}/>
                    <br/><br/>
                <GameRating gameId={gameId}/>
                </div>
            <GamePosts gameId={gameId}/>
            </div>
       </>
      )

}

