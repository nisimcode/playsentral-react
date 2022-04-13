import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import {GAMES_URL, getToken, POSTS_URL} from './request_utils';
import InfiniteScroll from 'react-infinite-scroller';
import {GameCard} from "./GameCard";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {Post} from "./Post";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export class GamePosts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            username: '',
            hasNext: true,
            text: '',
            showPostModal: false,
            currPostId: '',
            currText: ''
        }
        this.source = axios.CancelToken.source()
        this.nextUrl = GAMES_URL + this.props.gameId + '/posts'
    }

    getPosts() {
        console.log('getting posts')
        axios
        .get(this.nextUrl, getToken(), {
                cancelToken: this.source.token
            })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState(
                    {posts: [...this.state.posts, ...response.data],
                            hasNext: response.data.next != null,
                            username: window.localStorage.getItem('username')})
                this.nextUrl = response.data.next
            }})
        .catch(error =>
            {console.log(error)})
        }

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

    renderPosts(post) {
        return (
            <ListGroup.Item key={post.post_id}
                as="li" className="d-flex justify-content-between align-items-start" style={{width: '500px'}}>
               <div className="ms-2 me-auto">
                    <div className="fw-bold">{post.text} </div>
                    <div style={{fontStyle: "italic"}}>{post.username}</div>
                    <Button
                        variant={'primary'} size={'sm'} style={{width: '90px', height: '30px'}}
                        onClick={() => window.location.href = `${post.game_id}/posts/${post.post_id}`}>
                        Comments
                    </Button>
                    &ensp;
                    <Button
                        variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
                        hidden={post.username!== this.state.username}
                        onClick={() => {this.setState
                                    ({showPostModal: true, currPostId: post.post_id, text: post.text})}}>
                        Edit
                    </Button>
                    &ensp;
                    <Button
                        variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
                        hidden={post.username !== this.state.username}
                        onClick={() => this.handleDeletePost(post.post_id)}>
                        Delete
                    </Button>
                </div>
            </ListGroup.Item>
        )
    }

    componentWillUnmount() {
        this.source.cancel("Request cancelled")
    }

    render() {
        let postsData = this.state.posts.map(
            (post) => {
                return <Post post={post} username={this.state.username}/>
            }
            )


        return(
            <>
                <Header />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <InfiniteScroll
                pageStart={1}
                loadMore={() => this.getPosts()}
                hasMore={this.state.hasNext}
                loader={<h1 className="loader" key={0}>Loading ...</h1>}>
                {postsData}
                </InfiniteScroll>
                </div>
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
            </>
        )
    }
}