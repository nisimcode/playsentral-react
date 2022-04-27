import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Routes, Route } from "react-router-dom";
import {Container} from "react-bootstrap";
import {WrappedSignIn} from './SignIn';
import {Welcome} from "./Welcome";
import GamesList from "./GamesList";
import {WrappedGame} from "./Game";
import {WrappedSignUp} from "./SignUp";
import Jokes from "./Jokes";
import {PostComments} from "./PostComments";


function App () {

      return(

      <Container>

        <Routes>

            <Route path="/" element={<Welcome/>} />
            <Route path="/signin" element={<WrappedSignIn/>} />
            <Route path="/signup" element={<WrappedSignUp/>} />
            <Route path="/games" element={<GamesList/>} />
            <Route path="/games/:gameId" element={<WrappedGame/>} />
            <Route path="/jokes" element={<Jokes/>} />
            <Route path="/games/:gameId/posts/:postId" element={<PostComments/>} />

        </Routes>

      </Container>

    )
}

export default App;

