import React from 'react';
import ReactPaginate from "react-paginate";
import {ListGroup} from "react-bootstrap";
import axios from "axios";
import {GAMES_URL, getToken, POSTS_URL} from "./request_utils";
import Button from "react-bootstrap/Button";
import {AddPostModal} from "./AddPostModal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export class GamePosts extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           posts: [],
           username: '',
           offset: 0,
           perPage: 5,
           currentPage: 0,
           text: '',
           showPostModal: false,
           currPostId: '',
           currText: ''
      }
   }

    getPosts() {
        console.log('getting posts')
        axios
        .get(GAMES_URL + this.props.gameId + '/posts', getToken())
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log('failed getting posts');
            } else {

                this.setState({posts: response.data, username: window.localStorage.getItem('username')})
                console.log(this.state.posts)
                const slice = this.state.posts.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(post =>
                <React.Fragment key={post.id}>
                    <ListGroup.Item
                        as="li" className="d-flex justify-content-between align-items-start" style={{width: '500px'}}>
                        {/*onClick={() => window.location.href = `${this.props.gameId}/posts/${post.id}/details`}>*/}
                       <div className="ms-2 me-auto">
                            <div className="fw-bold">{post.text} </div>
                            {/*{post.game}*/}
                            <div style={{fontStyle: "italic"}}>{post.user}</div>
                            <Button
                                variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
                                hidden={post.user!== this.state.username}
                                onClick={() => {this.setState
                                            ({showPostModal: true, currPostId: post.id, text: post.text})}}>
                                Edit
                            </Button>
                            &ensp;
                            <Button
                                variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
                                hidden={post.user !== this.state.username}
                                onClick={() => this.handleDeletePost(post.id)}>
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                </React.Fragment>
                )
                this.setState({pageCount: Math.ceil(this.state.posts.length / this.state.perPage), postData})
                }})}

    handlePostSave() {
       if (this.state.currPostId !== '') {
           this.handleEditPost(this.state.currPostId)
       } else {
           this.handleNewPost(this.state.text)
       }
    }

    handleNewPost(text) {
        console.log("handleNewPost")
        axios
            .post(
            GAMES_URL + this.props.gameId + '/posts',
            {text: text, game: this.props.gameId},
            getToken()
            )
            .then(response => {
            if (response.status === 201) {
                this.getPosts()
            }})
            .catch(function (error) {
                console.log(error.toJSON())
            })
            console.log(this.state.posts)
            this.getPosts()
         // this.setState({text: ''})
    }

    handleEditPost(postId) {
        console.log(`${POSTS_URL + postId}`)
        console.log("handleEditPost")
        axios
            .put(
                POSTS_URL + postId,
                {text: this.state.text, game: this.props.gameId},
                getToken())
            .then(response => {
                if (response.status === 204) {
                    this.getPosts()
                }
            })
            .catch(function (error) {
                console.log(error.toJSON())
            })
            console.log(this.state.posts)
            // this.setState({currPostId: '', text: ''})
    }

    handleDeletePost(postId) {
        console.log(`${POSTS_URL + postId}`)
        console.log("handleDeletePost")
        axios
            // .delete(`${GAMES_URL}${this.props.gameId}/posts/${postId}`, getToken())
            .delete(POSTS_URL + postId, getToken())
            .then(response => {
                if (response.status === 204) {
                    this.getPosts()
                }
            })
            .catch(function (error) {
                console.log(error.toJSON());
            })
            console.log(this.state.posts)
            this.getPosts()
    }

    handlePageClick = (event) => {
        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getPosts()
        })
    }

    componentDidMount() {
        this.getPosts()
    }


    render() {
        return (
            <>
            <div style={{display: 'inline-flex', flexDirection: 'column'}}>
            <h3 style={{display: 'inline-flex'}}>Posts
                &emsp;
                <Button variant={'outline-primary'} size={'sm'} style={{width: '150px', height: '35px'}}
                    onClick={() => this.setState({showPostModal: true})}>
                Add your post
                </Button>
            </h3>


            <ListGroup>
                {this.state.postData}
            </ListGroup>

            <Modal
                show={this.state.showPostModal}
                onHide={() => this.setState({showPostModal: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Text</Form.Label>
                            <Form.Text>
                                <Form.Control
                                    type="text" placeholder="Enter text here..."
                                    value={this.state.text}
                                    onChange={(event) => this.setState({text: event.target.value})}/>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={() => this.setState({showPostModal: false})}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                            onClick={() => {this.setState({showPostModal: false}); this.handlePostSave()}}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <AddPostModal gameId={this.props.gameId}*/}
            {/*    show={this.state.showPostModal}*/}
            {/*    onAddPostClose={()=> this.setState({showPostModal: false})}*/}
            {/*    onSubmit={this.submitPost}/> *!/*/}
            {/*{ !this.state.showPostModal &&*/}
            {/*<Button onClick={() => this.setState({showPostModal: true})}>Add a new post</Button>}*/}
            {this.state.posts.length > 0 &&
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
