import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactTooltip from 'react-tooltip';
import {CURRENT_USER_URL, getToken} from "./request_utils";


export class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            logged_in: false,
            username: "",
        }
        this.handleSignOut = this.handleSignOut.bind(this)
      }

      componentDidMount() {
        const token = window.localStorage.getItem('token')
        if (token) {
          axios.get(CURRENT_USER_URL, getToken())
          .then(response => {
            if (response.status === 200) {
                console.log("got response for user " + response.data)
                localStorage.setItem('username', response.data)
                this.setState(
                    {logged_in: true, username: response.data})
            } else if (response.status === 401) {
              console.log('401')
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              console.log("Need to go to login")
            }
          })
        } else {
          console.log("Need to go to login")
        }
      }

    handleSignOut (event) {
        event.preventDefault()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        this.setState({logged_in: false})
        window.location.href='/'
  }


    render() {
        return(
            <>
            <Navbar>
              <Navbar.Brand href="/">PlaySentral</Navbar.Brand>
              <Navbar.Toggle />
              {/*<Nav.Link href="/">Home</Nav.Link>*/}
              <Nav.Link href="/games">Games</Nav.Link>
              {/*<Nav.Link href="/threads">Posts</Nav.Link>*/}
              <Nav.Link href="/jokes">Jokes</Nav.Link>
              <Navbar.Collapse className="justify-content-end">
                  { this.state.logged_in &&
                <Navbar.Text style={{fontSize:"20px"}}>
                    Hello, {this.state.username}
                    &emsp;
                     <Button
                         data-tip="Leaving so soon?"
                         variant="outline-secondary"
                         size='sm'
                         onClick={this.handleSignOut}>
                         Sign out
                     </Button>
                    <ReactTooltip place={"bottom"} type={"error"} multiline={true}/>
                </Navbar.Text>
                      }
              { !this.state.logged_in &&
                <Navbar.Text>
                    <Button
                        variant="outline-primary"
                        size='sm'
                        onClick={() => window.location.href='/signin'}>
                        Sign in
                    </Button>
                </Navbar.Text>
                      }

              </Navbar.Collapse>
          </Navbar>
        </>
        )
    }
}