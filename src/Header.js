import React, {useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactTooltip from 'react-tooltip';
import {CURRENT_USER_URL, getToken} from "./request_utils";


export default function Header() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    useEffect( () => {
        const token = window.localStorage.getItem('token')
        if (token) {
          axios.get(CURRENT_USER_URL, getToken())
          .then(response => {
            if (response.status === 200) {
                // console.log("got response for user " + response.data.username)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('userId', response.data.userId)
                setLoggedIn(true)
                setUsername(response.data.username)
            } else if (response.status === 401) {
              window.alert('401: Unauthorized')
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              window.alert("You need to login")
            }
          })
        } else {
          window.alert("You need to login")
        }
      }, []
    )

    const handleSignOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        setLoggedIn(false)
        window.location.href='/'
  }
        return(
            <>
                <Navbar>
                  <Navbar.Brand href="/">PlaySentral</Navbar.Brand>
                  <Navbar.Toggle />
                  <Nav.Link href="/games">Games</Nav.Link>
                  <Nav.Link href="/jokes">Jokes</Nav.Link>
                  <Navbar.Collapse className="justify-content-end">
                  { loggedIn &&
                    <Navbar.Text style={{fontSize:"20px"}}>
                        Hello, {username}
                        &emsp;
                         <Button
                             data-tip="Leaving so soon?"
                             variant="outline-secondary"
                             size='sm'
                             onClick={handleSignOut}>
                             Sign out
                         </Button>
                        <ReactTooltip place={"bottom"} type={"error"} multiline={true}/>
                    </Navbar.Text> }
                  { !loggedIn &&
                    <Navbar.Text>
                        <Button
                            variant="outline-primary"
                            size='sm'
                            onClick={() => {window.localStorage.setItem("sender", window.location.href);
                                            window.location.href='/signin';
                                            }}>
                            Sign in
                        </Button>
                    </Navbar.Text> }
                  </Navbar.Collapse>
                </Navbar>
            </>
        )
}