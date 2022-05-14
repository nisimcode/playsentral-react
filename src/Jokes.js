import axios from 'axios';
import {useEffect, useState} from 'react';
import Header from './Header';
import {JOKES_URL} from './request_utils';
import SinglePartJoke from "./SinglePartJoke";
import TwoPartJoke from "./TwoPartJoke";

export default function Jokes() {

    const [jokeData, setJokeData] = useState([])

    const getJoke = () => {
        axios
            .get(JOKES_URL)
            .then(res => { setJokeData(res.data)})
            .catch(err => window.alert(err))
            }

    const renderJoke = () => {
        if (jokeData.type === 'single') {
            return <SinglePartJoke joke={jokeData.joke} getJoke={getJoke}/>
        } else if (jokeData.type === 'twopart') {
            return <TwoPartJoke jokeSetup={jokeData.setup} jokeDelivery={jokeData.delivery} getJoke={getJoke}/>
        } else {
            return <h1>Loading...</h1>
        }
    }

    useEffect( () =>{ getJoke() }, [] )

    return (
        <>
            <Header />
            <br />
            { renderJoke() }
        </>
    )

}