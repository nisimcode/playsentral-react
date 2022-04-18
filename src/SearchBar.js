import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Game} from "./Game";
import {Button, Form, FormControl} from "react-bootstrap";

export class SearchBar extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             input: ''
         }
     }


    render() {
        return (
            <>
             <Form className="d-flex" style={{maxWidth: 400}} >
                    <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                      value={this.state.input}
                      onChange={(event) => this.setState({input: event.target.value})}/>
                    <Button variant="outline-success"
                            onClick={() =>
                            {this.props.handleSearch(this.state.input);}}>
                        Search
                    </Button>
             </Form>
            <br/>
            </>
        )
    }
}


