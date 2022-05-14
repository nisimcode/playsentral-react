import React from 'react';
import {ListGroup} from "react-bootstrap";
import axios from "axios";
import {GAMES_URL, getToken, POSTS_URL, RESPONSES_URL} from "./request_utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export class GamePosts extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
            posts: [],
            username: '',
            response: '',
            text: '',
            showPostModal: false,
            currPostId: 0,
      }
   }

    getPosts() {
        console.log('getting game posts from ' + GAMES_URL + this.props.gameId + '/posts')
        axios
            .get(GAMES_URL + this.props.gameId + '/posts', getToken())
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({
                        posts: response.data,
                        username: window.localStorage.getItem('username'),
                        // userId: window.localStorage.getItem('userId')
                    })
                    console.log(this.state.posts)
                } else {
                    console.log('failed getting games')
                }
            })
            .catch(function (error) {
                console.log(error.toJSON())
            })
    }


    renderPosts(post) {
       return (
           <ListGroup.Item key={post.post_id}
            as="li" className="d-flex justify-content-between align-items-start"
                           style={{width: '350px',
                               backgroundColor: this.state.showComments && this.state.currPostId === post.post_id
                                   ? 'lightblue' : 'white'}}>
               <div className="ms-2 me-auto"
               onMouseEnter={() => this.setState(
                            {currPostId: post.post_id, showComments: true})}
                        onMouseLeave={() => this.setState(
                            {currPostId: post.post_id, showComments: false})}>
                    <div className="fw-bold">{post.text} </div>
                    <div style={{fontStyle: "italic"}}>{post.username}</div>
                    <Button
                        variant={post.user_response === 'like' ? 'success' : 'outline-success'}
                        size={'sm'} style={{width: '60px', height: '30px'}}
                        onClick={() => this.handleResponse(post.post_id, 'like')}>
                        👍 ({post.likes})
                    </Button>
                   &ensp;
                    <Button
                        variant={post.user_response === 'dislike' ? 'danger' : 'outline-danger'}
                        size={'sm'} style={{width: '60px', height: '30px'}}
                        onClick={() => this.handleResponse(post.post_id, 'dislike')}>
                        👎 ({post.dislikes})
                    </Button>
                    &ensp;
                    <Button
                        variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
                        hidden={post.username!== this.state.username}
                        onClick={() => {this.setState
                                    ({showPostModal: true, currPostId: post.post_id})}}>
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

    handlePostSave() {
       if (this.state.currPostId !== '') {
           this.handleEditPost()
       } else {
           this.handleNewPost()
       }
    }

    handleNewPost() {
        console.log("handleNewPost")
        axios
            .post(
            GAMES_URL + this.props.gameId + '/posts',
            {text: this.state.text, game: this.props.gameId, addLike: true},
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
    }

    handleEditPost() {
        console.log(`${POSTS_URL + this.state.currPostId}`)
        console.log("handleEditPost")
        axios
            .put(
                POSTS_URL + this.state.currPostId,
                {text: this.state.text, game: this.props.gameId},
                getToken())
            .then(response => {
                if (response.status === 201 || response.status === 204) {
                    this.getPosts()
                }
            })
            .catch(function (error) {
                console.log(error.toJSON())
            })
            console.log(this.state.posts)
    }


    handleDeletePost(postId) {
        console.log("called handleDeletePost")
        console.log('asking to delete ' + POSTS_URL + postId)
        axios
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
    }

    handleResponse (postId, response) {
        console.log("called handleResponse ")
        console.log('sending game post response to: ' + RESPONSES_URL)
        axios
            .post(
                RESPONSES_URL,
                {post: postId, response: response, game: this.props.gameId},
                getToken())
            .then(response => {
                if (response.status === 201 || response.status === 204) {
                    console.log('game post response sent successfully')
                    console.log('asking to refresh game posts')
                    this.getPosts()
                }
            })
            .catch(function (error) {
                console.log(error.toJSON())
            })
    }

       componentDidMount() {
        this.getPosts()
    }


    render() {
       let postData = this.state.posts.map(
           (post) =>
               this.renderPosts(post)
       )

        return (
            <>
            <div style={{marginTop: 5, marginRight: 20}}>
            <h3 style={{display: 'flex'}}>Posts
                &emsp;
                <Button variant={'outline-primary'} size={'sm'} style={{width: 150, height: 30, marginTop: 5}}
                    onClick={() => this.setState({showPostModal: true, currPostId: '', text: ''})}>
                Add your post
                </Button>
            </h3>

                <div style={{margin: 0}}>
                    {postData}
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
                                    value={this.state.text} aria-required={'true'}
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
            </div>
            </>
        );
    }
}
