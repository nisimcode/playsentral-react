import axios from 'axios';
import React from 'react';
import {Button, Card, Form, FormControl, ListGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import {GAMES_URL, TOKEN_URL} from './request_utils';
import ReactPaginate from "react-paginate";
import {cloneDeep} from "lodash";
import {SearchBar} from "./SearchBar";

export class GamesList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            games: [],
            offset: 0,
            perPage: 5,
            currentPage: 0,
        }

        this.handlePageClick = this.handlePageClick.bind(this)
        this.getGames = this.getGames.bind(this)
        this.paginateGames = this.paginateGames.bind(this)

    }

    getGames() {
        console.log('getting games')
        axios
        .get(GAMES_URL)
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting games');
            } else {
                this.setState({games: response.data})
                console.log(this.state.games)
                this.paginateGames()
            }})}

    paginateGames() {
        const gamesClone = cloneDeep(this.state.games)
        const slice = gamesClone.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(game =>
        <React.Fragment key={game.id} className='row' >
            {/*<ListGroup.Item onClick={() => window.location.href = `games/${game.id}/details`}>*/}
            {/*    <img src={game.picture_url} alt={game.name + ' image'} className='coverArt'/>*/}
            {/*    &emsp;*/}
            {/*    <p className="gameName">{game.name}</p>*/}

            {/*</ListGroup.Item>*/}

            <Card style={{width: '15rem', padding: 0}} className="col-sm-6" >
                <Card.Img
                    variant="top" src={game.picture_url} alt={game.name + ' image'}
                    style={{display: 'inline-block', width: 120, height: 160,
                            cursor: 'pointer', marginLeft: 60, marginTop: 10}}
                    onClick={() => window.location.href = `games/${game.id}`}/>
                <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>{game.description}</Card.Text>
                    {/*<Button variant="primary">Go somewhere</Button>*/}
              </Card.Body>
            </Card>
            &emsp;

        </React.Fragment>
        )
        this.setState({pageCount: Math.ceil(this.state.games.length / this.state.perPage), postData})
    }


    componentDidMount() {
        this.getGames()
    }


    handlePageClick = (event) => {
        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getGames()
        })
    }


    // handleSaveNew() {
    //     console.log('called handleSaveNew')
    //     axios.post(
    //         GAMES_URL,
    //         {data},
    //         getHeader()
    //     )
    //     .then(response => {
    //         if (response.status == 201) {
    //             this.getGames()
    //         }
    //     })
    //
    // }

    // deleteSub(game_id) {
    //     axios.delete(
    //         `${GAMES_URL}/${game_id}`,
    //     ).then(response => {
    //         if (response.status === 200) {
    //             this.getGames()
    //         }
    //     })
    // }
    //


    render() {

        return(
            <>
                <Header />
                <div className='row'>
                    {this.state.postData}
                </div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </>
        )
    }
}