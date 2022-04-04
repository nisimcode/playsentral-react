import axios from 'axios';
import React from 'react';
import {Button, Form, FormControl, ListGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import {GAMES_URL, THREADS_URL, TOKEN_URL} from './request_utils';
import ReactPaginate from "react-paginate";
import {cloneDeep} from "lodash";
import {SearchBar} from "./SearchBar";

export class Threads extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            offset: 0,
            perPage: 5,
            currentPage: 0,
        }

        this.handlePageClick = this.handlePageClick.bind(this)
        this.getThreads = this.getThreads.bind(this)
        this.paginateThreads = this.paginateThreads.bind(this)

   }

    getThreads() {
        console.log('getting threads')
        axios
        .get(THREADS_URL)
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting threads');
            } else {
                this.setState({threads: response.data})
                console.log(this.state.threads)
                this.paginateThreads()
            }})}

    paginateThreads() {
        const threadsClone = cloneDeep(this.state.threads)
        const slice = threadsClone.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(thread =>
        <React.Fragment key={thread.id} >
            <ListGroup.Item
                as="li" className="d-flex justify-content-between align-items-start"
                onClick={() => window.location.href = `threads/${thread.id}/details`}>
               <div className="ms-2 me-auto">
                            <div className="fw-bold">{thread.title}</div>
                            {thread.game}
                            <div style={{fontStyle: "italic"}}>{thread.starter}</div>
                        </div>
            </ListGroup.Item>
        </React.Fragment>
        )
        this.setState({pageCount: Math.ceil(this.state.threads.length / this.state.perPage), postData})
    }


    componentDidMount() {
        this.getThreads()
    }


    handlePageClick = (event) => {
        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getThreads()
        })
    }


    render() {

        return(
            <>
                <Header />
                {/*<SearchBar db={this.state.games}/>*/}

                {this.state.postData}
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