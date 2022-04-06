import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Game} from "./Game";
import {Button, Form, FormControl} from "react-bootstrap";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    componentDidMount() {

    }



    render() {
        return (
            <>
             <Form className="d-flex" style={{maxWidth: 400}} onSubmit={this.handleSearch}>
                    <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                      value={this.state.search}
                      onChange={(event) => this.setState({search: event.target.value})}/>
                    <Button variant="outline-success">Search</Button>
             </Form>
            <br/>
            </>
        )
    }
}

// export const WrappedGameThreads = props => {
//     const {gameId} = useParams()
//     const navigate = useNavigate()
//     return <GameThreads gameId={gameId} navigate={navigate} {...props} />

