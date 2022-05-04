import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Header} from './Header-cls';
import {GAMES_URL} from './request_utils';
import InfiniteScroll from 'react-infinite-scroller';
import {GameCard} from "./GameCard";
import {Button, Form, FormControl} from "react-bootstrap";


export default function GamesList () {

    const [gamesList, setGamesList] = useState([])
    const [hasNext, setHasNext] = useState(true)
    const [searchInput, setSearchInput] = useState('')
    const [gameData, setGameData] = useState(null)
    const source = axios.CancelToken.source()
    let nextUrl = GAMES_URL


    const getGames = () => {
        if (searchInput) {
            nextUrl = GAMES_URL
            setGamesList([])
        }
        console.log('getting games from ' + nextUrl)
        axios
        .get(nextUrl, {
            cancelToken: source.token,
            params: { searchValue: searchInput }
        })
        .then(response => {
            console.log(response)
            if (response.statusText === 'OK') {
                setGamesList([...gamesList, ...response.data])
                setHasNext(response.data.next != null)
                nextUrl = response.data.next
                console.log('calling renderGames')
                renderGames()
            }})
        .catch(error =>
            {console.log(error)})
        }

     const renderGames = () => {
         console.log('inside renderGames')
         let gameCards = gamesList.map(
             (game) => {
                 return <GameCard key={game.id} game={game}/>
             }
         )
         setGameData(gameCards)
     }

    useEffect(() =>
    {
         console.log('mounting')
        return () => {
            console.log('unmounting')
            source.cancel("Request cancelled")

        }
    }, [source])

    return(
        <>
            <Header />

            <Form
                className="d-flex" style={{maxWidth: 400}} >

                <FormControl
                    type="search" placeholder="Search" className="me-2" aria-label="Search"
                    value={searchInput}
                    onChange={ (event) => setSearchInput(event.target.value) } />

                <Button
                    variant="outline-success"
                    onClick={getGames}>
                    Search
                </Button>

            </Form>

            <InfiniteScroll
                pageStart={1}
                loadMore={getGames}
                hasMore={hasNext}
                loader={<h1 className="loader" key={0}>Loading ...</h1>}>

                <div
                    style={{display: "flex", flexWrap: 'wrap'}}>
                    {gameData}
                </div>

            </InfiniteScroll>
        </>
    )
}