import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {GAMES_URL, getToken, THREADS_URL} from "./request_utils";
import {cloneDeep } from "lodash"
import {Container, ListGroup} from "react-bootstrap";
import {Header} from "./Header";
import {GameDetails, WrappedGameDetails} from "./GameDetails";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import {GamePosts} from "./GamePosts";
import {GameRating} from "./GameRating";


export class Game extends React.Component {

    constructor(props) {
      super(props)
        this.state = {
            game: [],
            // threads: [],
            // offset: 0,
            // perPage: 5,
            // currentPage: 0
      }
        // this.handlePageClick = this.handlePageClick.bind(this)
        // this.getThreads = this.getThreads.bind(this)
        // this.paginateThreads = this.paginateThreads.bind(this)
}

    getGame() {
        console.log('getting game')
        axios
        .get(GAMES_URL + this.props.gameId + '/details', getToken())
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting game')
            }
            this.setState({game: response.data})
        })}

    // getThreads() {
    //     console.log('getting threads')
    //     axios
    //     .get(GAMES_URL + this.props.gameId + '/threads', getToken())
    //     .then(response => {
    //         console.log(response)
    //         if (response.status !== 200) {
    //             console.log('failed getting threads');
    //         } else {
    //             this.setState({threads: response.data})
    //             console.log(this.state.threads)
    //             // this.paginateThreads()
    //         }})}
    //
    // paginateThreads() {
    //     const threadsClone = cloneDeep(this.state.threads)
    //     const slice = threadsClone.slice(this.state.offset, this.state.offset + this.state.perPage)
    //     const postData = slice.map(thread =>
    //     <React.Fragment key={thread.id} >
    //         <ListGroup.Item
    //             as="li" className="d-flex justify-content-between align-items-start"
    //             onClick={() => window.location.href = `threads/${thread.id}/details`}>
    //            <div className="ms-2 me-auto">
    //                         <div className="fw-bold">{thread.title}</div>
    //                         {thread.game}
    //                         <div style={{fontStyle: "italic"}}>{thread.starter}</div>
    //                     </div>
    //         </ListGroup.Item>
    //     </React.Fragment>
    //     )
    //     this.setState({pageCount: Math.ceil(this.state.threads.length / this.state.perPage), postData})
    // }
    //
    // handlePageClick = (event) => {
    //     const selectedPage = event.selected;
    //     const offset = selectedPage * this.state.perPage;
    //
    //     this.setState({
    //         currentPage: selectedPage,
    //         offset: offset
    //     }, () => {
    //         this.getThreads()
    //     })
    // }

        componentDidMount() {
            this.getGame()
            // this.getThreads()
        }

    render() {
        // const game = cloneDeep(this.state.game)
        return(
        <>
            <Header />
            <div style={{display: 'inline-flex'}}>
                <div style={{display: 'inline-flex', flexDirection: "column"}}>
                <GameDetails game={this.state.game}/>
                    <br/>
                <GameRating gameId={this.props.gameId}/>
                </div>
            &emsp;&emsp;
            <GamePosts gameId={this.props.gameId} gameData={this.props.gameData} />
            </div>
       </>
      )
    }
  }

export const WrappedGame = props => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    return <Game gameId={gameId} navigate={navigate} {...props} />
}

            // {/*<Container style={{display: "flex"}}>*/}
            // {/*    <div>*/}
            // {/*        <img src={game.picture_url} alt={game.name + ' image'} height={450} />*/}
            // {/*    </div>*/}
            // {/*    &emsp;&emsp;&emsp;*/}
            // {/*    <div>*/}
            // {/*        <h3>Details</h3>*/}
            // {/*        <ListGroup as="ul" >*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Name</div>*/}
            // {/*                    {game.name}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Publisher</div>*/}
            // {/*                    {game.publisher}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Developer</div>*/}
            // {/*                    {game.developer}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*            { game.series !== "" &&*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Series</div>*/}
            // {/*                      {game.series}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>}*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                      <div className="fw-bold">Release Year</div>*/}
            // {/*                      {game.release_year}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Genre</div>*/}
            // {/*                    {game.genre}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">*/}
            // {/*                <div className="ms-2 me-auto">*/}
            // {/*                    <div className="fw-bold">Average Rating</div>*/}
            // {/*                    {game.avg_rating ? game.avg_rating : 'N/A'}*/}
            // {/*                </div>*/}
            // {/*            </ListGroup.Item>*/}
            // {/*        </ListGroup>*/}
            // {/*    </div>*/}
            // {/*    &emsp;&emsp;&emsp;*/}
            // {/*    <div>*/}
            // {/*        <h3>Posts</h3>*/}
            // {/*        {this.state.postData}*/}
            // {/*        {this.state.threads.length > 0 &&*/}
            // {/*        <ReactPaginate*/}
            // {/*            previousLabel={"prev"}*/}
            // {/*            nextLabel={"next"}*/}
            // {/*            breakLabel={"..."}*/}
            // {/*            breakClassName={"break-me"}*/}
            // {/*            pageCount={this.state.pageCount}*/}
            // {/*            marginPagesDisplayed={2}*/}
            // {/*            pageRangeDisplayed={5}*/}
            // {/*            onPageChange={this.handlePageClick}*/}
            // {/*            containerClassName={"pagination"}*/}
            // {/*            subContainerClassName={"pages pagination"}*/}
            // {/*            activeClassName={"active"}/>}*/}
            // {/*     </div>*/}
            // {/*</Container>*/}

