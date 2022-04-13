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
            showPostModal: false,
            currPostId: '',
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
                this.setState({posts: response.data,
                                    username: window.localStorage.getItem('username')})
                console.log(this.state.posts)
                }})}

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
            {text: this.state.text, game: this.props.gameId},
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
                if (response.status === 204) {
                    this.getPosts()
                }
            })
            .catch(function (error) {
                console.log(error.toJSON())
            })
            console.log(this.state.posts)
    }

    handleDeletePost(postId) {
        console.log(`${POSTS_URL + postId}`)
        console.log("handleDeletePost")
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

    componentDidMount() {
        this.getPosts()
    }


    render() {
       let postData = this.state.posts.map(
           (post) =>
               this.renderPosts(post)
       )

        return (
            <div style={{margin: 20, marginTop: 5, width: 250}}>
            <h3 style={{display: 'inline-flex'}}>Posts
                &emsp;
                <Button variant={'outline-primary'} size={'sm'} style={{width: 150, height: 30, marginTop: 5}}
                    onClick={() => this.setState({showPostModal: true, currPostId: '', text: ''})}>
                Add your post
                </Button>
            </h3>
            <div style={{margin: -35}}>
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
            </div>
        );
    }
}
