import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Routes, Route } from "react-router-dom";
import {Container} from "react-bootstrap";
import {WrappedSignIn} from './SignIn';
import {Welcome} from "./Welcome";
import {GamesList} from "./GamesList";
import {WrappedGame, WrappedGameDetails} from "./Game";
import {WrappedSignUp} from "./SignUp";
import {Jokes} from "./Jokes";
import {WrappedGameThreads} from "./GamePosts";
import {Posts} from "./Posts";


class App extends React.Component {

  render() {
    return(

      <Container>
        <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/signin" element={<WrappedSignIn/>} />
            <Route path="/signup" element={<WrappedSignUp/>} />
            <Route path="/games" element={<GamesList/>} />
            <Route path="/games/:gameId" element={<WrappedGame/>} />
            <Route path="/jokes" element={<Jokes/>} />

            {/*<Route path="/posts" element={<Posts/>} />*/}
            {/*<Route path="/games/:threadId/details" element={<WrappedThreadDetails/>} />*/}
            {/*<Route path="/games/:gameId/threads" element={<WrappedGameThreads/>} />*/}
            {/*<Route path="/game_threads/:game_tag" element={<Posts/>} />*/}
            {/*<Route path="/game_threads/:thread_id" element={<WrappedThread/>} />*/}


            {/*<Route path="/signup" element={<WrappedLogin />} />*/}

            {/*<Route path="/user_profile" element={<WrappedUserProfile />} />*/}
        </Routes>
      </Container>

    )
  }

}

export default App;
