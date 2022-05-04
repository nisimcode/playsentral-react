import React from 'react';
import Header from './Header';

export default function Welcome () {

    return(
    <>
        <Header />
        <h2>PlaySentral, your go-to website for PS games</h2>
        <br/>
        <img src={'game_collage.jpg'} alt="logo" height={650} />
    </>
        )
}