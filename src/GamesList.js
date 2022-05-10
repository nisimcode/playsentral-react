import axios from 'axios';
import React from 'react';
import Header from './Header-cls';
import {GAMES_URL} from './request_utils';
import InfiniteScroll from 'react-infinite-scroller';
import GameCard from "./GameCard";
import {Button, Form, FormControl} from "react-bootstrap";

export default class GamesList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            games: [],
            hasNext: true,
            searchInput: '',
            sortInput: ''
        }

        this.source = axios.CancelToken.source()
        this.nextUrl = GAMES_URL
    }


    getGames() {
        if (this.state.searchInput) {
            this.nextUrl = GAMES_URL
            this.setState({games: []})
        }
        // console.log('getting games from ' + this.nextUrl)
        axios
        .get(this.nextUrl, {
            cancelToken: this.source.token,
            params: this.getParams()
        })
        .then(response => {
            // console.log(response)
            if (response.statusText === 'OK') {
                this.setState(
                    {games: [...this.state.games, ...response.data],
                            hasNext: response.data.next != null})
                this.nextUrl = response.data.next
                // console.log('calling renderGames')
                this.renderGames()
            }})
        .catch(error =>
            {window.alert(error)})
        }

    renderGames () {
        // console.log('inside renderGames')
         let gameData = this.state.games.map(
            (game) => {
                return  <GameCard key={game.id} game={game}/>
            }
            )
        this.setState({gameData})
    }

    componentWillUnmount() {
        this.source.cancel("Request cancelled")
    }

    getParams() {
        if (this.state.searchInput !== "" && this.state.sortInput !== "") {
            return {searchValue: this.state.searchInput, sortValue: this.state.sortInput}
        } else if (this.state.searchInput !== "" && this.state.sortInput === "") {
            return {searchValue: this.state.searchInput}
        } else if (this.state.searchInput === "" && this.state.sortInput !== "") {
            return {sortValue: this.state.sortInput}
        } else {
            return {}
        }
    }


    render() {

        return(
            <>
                <Header />
                {/*<SearchBar handleSearch={this.handleSearch} />*/}
                <Form className="d-flex" style={{maxWidth: 400}} >
                    <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                      value={this.state.searchInput}
                      onChange={(event) => this.setState({searchInput: event.target.value})}/>
                    <Button variant="outline-success"
                            onClick={() => this.getGames()}>
                        Search
                    </Button>
                    <div >
                    <Button variant={this.state.sortInput !== 'desc' ? "dark" : "outline-dark"}
                            style={{marginLeft: 10, marginBottom: 5, width: 120, height: 28, fontSize: 12}}
                            onClick={() => this.setState({sortInput: 'asc'})}>
                        Ascending
                    </Button>
                    <Button variant={this.state.sortInput === 'desc' ? "dark" : "outline-dark"}
                            style={{marginLeft: 10, width: 120, height: 28, fontSize: 12}}
                            onClick={() => this.setState({sortInput: 'desc'})}>
                        Descending
                    </Button>
                    </div>
                </Form>
                <InfiniteScroll
                pageStart={1}
                loadMore={() => this.getGames()}
                hasMore={this.state.hasNext}
                loader={<h1 className="loader" key={0}>Loading ...</h1>}>
                <div style={{display: "flex", flexWrap: 'wrap'}}>
                    {this.state.gameData}
                </div>
                </InfiniteScroll>

            </>
        )
    }
}