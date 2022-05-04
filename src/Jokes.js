import axios from 'axios';
import {useEffect, useState} from 'react';
import Header from './Header';
import {JOKES_URL} from './request_utils';
import SinglePartJoke from "./SinglePartJoke";
import TwoPartJoke from "./TwoPartJoke";

export default function Jokes() {

    const [jokeData, setJokeData] = useState([])

    const getJoke = async () => {
        try {
            const res = await axios.get(JOKES_URL)
            setJokeData(res.data)
        } catch(err) {
                console.error(err)
            }
        }

    const forkJoke = () => {
        if (jokeData.type === 'single') {
            return <SinglePartJoke joke={jokeData.joke} getJoke={getJoke}/>
        } else if (jokeData.type === 'twopart') {
            return <TwoPartJoke jokeSetup={jokeData.setup} jokeDelivery={jokeData.delivery} getJoke={getJoke}/>
        } else {
        console.log('incorrect jokeData.type')
        }
    }

    useEffect(() =>{
        getJoke().then(() => console.log('Jokes component mounted and getJoke called'))
        }, []
    )

    return (
        <>
            <Header />
            <br />
            { forkJoke() }
        </>
    )

}