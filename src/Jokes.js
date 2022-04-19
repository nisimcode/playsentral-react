import axios from 'axios';
import {useEffect, useState} from 'react';
import { Header } from './Header';
import {JOKES_URL} from './request_utils';
import SinglePartJoke from "./SinglePartJoke";
import TwoPartJoke from "./TwoPartJoke";

function Jokes () {

    const [jokeData, setJokeData] = useState([])

    const getJoke = () => {
        console.log('getting a random joke')
        axios
            .get(JOKES_URL)
            .then(response => {
                console.log(response)
                if (response.status !== 200) {
                    console.log('failed getting joke');
                }
                setJokeData(response.data)
                console.log(jokeData)
            })
    }

    useEffect(() => {getJoke()}, [])


    return (
         <>
        <Header />
        <br />
        { jokeData.type === 'single' &&
            <SinglePartJoke joke={jokeData.joke} getJoke={getJoke}/>}
        { jokeData.type === 'twopart' &&
            <TwoPartJoke jokeSetup={jokeData.setup} jokeDelivery={jokeData.delivery} getJoke={getJoke}/>}
        </>
    )

}

export default Jokes