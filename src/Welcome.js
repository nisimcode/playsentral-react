import React from 'react';

import { Header } from './Header';
import {Carousel, Container} from "react-bootstrap";
import { getHeader, GAMES_URL } from './request_utils';

export class Welcome extends React.Component {

    render() {
        return(
        <>
            <Header />
            <h2>PlaySentral, your go-to website for Playstation games</h2>
            <br/>
            <img src={'game_collage.jpg'} alt="logo" height={650} />
        </>
            )
    }
}