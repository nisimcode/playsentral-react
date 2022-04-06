import React from 'react';
import ReactPaginate from "react-paginate";
import {ListGroup} from "react-bootstrap";
import axios from "axios";
import {GAMES_URL, getToken} from "./request_utils";

export class GameThreads extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           threads: [],
           offset: 0,
           perPage: 5,
           currentPage: 0
       }
   }

    getThreads() {
        console.log('getting threads')
        axios
        .get(GAMES_URL + this.props.gameId + '/threads', getToken())
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting threads');
            } else {
                this.setState({threads: response.data})
                console.log(this.state.threads)
                const slice = this.state.threads.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(thread =>
                <React.Fragment key={thread.id}>
                    <ListGroup.Item
                        as="li" className="d-flex justify-content-between align-items-start" style={{width: '500px'}}
                        onClick={() => window.location.href = `threads/${thread.id}/details`}>
                       <div className="ms-2 me-auto">
                            <div className="fw-bold">{thread.title}</div>
                            {/*{thread.game}*/}
                            <div style={{fontStyle: "italic"}}>{thread.starter}</div>
                        </div>
                    </ListGroup.Item>
                </React.Fragment>
                )
                this.setState({pageCount: Math.ceil(this.state.threads.length / this.state.perPage), postData})
                }})}

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

    componentDidMount() {
        this.getThreads()
    }


    render() {
        return (
            <>
            <div style={{display: 'inline-flex', flexDirection: 'column'}}>
            <h3>Threads</h3>
                <ListGroup>
                    {this.state.postData}
                </ListGroup>
                {this.state.threads.length > 0 &&
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={() => this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>}
                </div>
             </>
        );
    }
}
