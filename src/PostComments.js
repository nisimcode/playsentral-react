import axios from 'axios';
import React from 'react';
import {getToken, POSTS_URL} from './request_utils';
import InfiniteScroll from 'react-infinite-scroller';
import {ListGroup} from "react-bootstrap";

export class PostComments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            text: '',
            username: '',
            hasNext: true,
        }

        this.source = axios.CancelToken.source()
        this.nextUrl = POSTS_URL + this.props.postId + '/comments'
    }

    handleNewComment() {
        console.log("handleNewComment")
        axios
            .post(
            POSTS_URL + this.props.postId + '/comments',
            {text: this.state.text, post: this.props.postId},
            getToken()
            )
            .then(response => {
            if (response.status === 201) {
                this.nextUrl = POSTS_URL + this.props.postId + '/comments'
                this.getComments()
            }})
            .catch(function (error) {
                console.log(error.toJSON())
            })
            console.log(this.state.comments)
    }


    getComments() {
        if (this.state.searchInput) {
            this.nextUrl = POSTS_URL + this.props.postId + '/comments'
            this.setState({comments: []})
        }
        console.log('getting comments from ' + this.nextUrl)
        axios
        .get(this.nextUrl, {
            cancelToken: this.source.token,
        })
        .then(response => {
            console.log(response)
            if (response.statusText === 'OK') {
                this.setState(
                    {comments: [...this.state.comments, ...response.data],
                            hasNext: response.data.next != null})
                this.nextUrl = response.data.next
                console.log('calling renderComments')
            }})
        .catch(error =>
            {console.log(error)})
        }

     renderComments(comment) {
        return (
           <ListGroup.Item key={comment.comment_id}
            as="li" className="d-flex justify-content-between align-items-start"
                           style={{width: '400px', backgroundColor: 'lightblue'}}>
               <div className="ms-2 me-auto" >
                    <div className="fw-bold">{comment.text} </div>
                    <div style={{fontStyle: "italic"}}>{comment.username}</div>
                   {/* <Button*/}
                   {/*     variant={post.user_response === 'like' ? 'success' : 'outline-success'}*/}
                   {/*     size={'sm'} style={{width: '90px', height: '30px'}}*/}
                   {/*     onClick={() => this.handleResponse(post.post_id, 'like')}>*/}
                   {/*     Like ({post.likes})*/}
                   {/* </Button>*/}
                   {/*&ensp;*/}
                   {/* <Button*/}
                   {/*     variant={post.user_response === 'dislike' ? 'danger' : 'outline-danger'}*/}
                   {/*     size={'sm'} style={{width: '90px', height: '30px'}}*/}
                   {/*     onClick={() => this.handleResponse(post.post_id, 'dislike')}>*/}
                   {/*     Dislike ({post.dislikes})*/}
                   {/* </Button>*/}
                   {/*&emsp;*/}
                   {/* <Button*/}
                   {/*     variant={'primary'} size={'sm'} style={{width: '90px', height: '30px'}}*/}
                   {/*     onClick={() => this.setState({showComments: true, currPostId: post.post_id})}>*/}
                   {/*     Comments*/}
                   {/* </Button>*/}
                   {/* &ensp;*/}
                   {/* <Button*/}
                   {/*     variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}*/}
                   {/*     hidden={post.username!== this.state.username}*/}
                   {/*     onClick={() => {this.setState*/}
                   {/*                 ({showPostModal: true, currPostId: post.post_id})}}>*/}
                   {/*     Edit*/}
                   {/* </Button>*/}
                   {/* &ensp;*/}
                   {/* <Button*/}
                   {/*     variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}*/}
                   {/*     hidden={post.username !== this.state.username}*/}
                   {/*     onClick={() => this.handleDeletePost(post.post_id)}>*/}
                   {/*     Delete*/}
                   {/* </Button>*/}
                </div>
            </ListGroup.Item>
       )
    }


    componentWillUnmount() {
        this.source.cancel("Request cancelled")
    }


    render() {

        let commentData = this.state.comments.map(
            (comment) =>
                this.renderComments(comment)
            )

        return(
                <InfiniteScroll
                pageStart={1}
                loadMore={() => this.getComments()}
                hasMore={this.state.hasNext}
                loader={<h1 className="loader" key={0}>Loading ...</h1>}>
                <div style={{display: "flex", flexWrap: 'wrap'}}>
                    {commentData}
                </div>
                </InfiniteScroll>
        )
    }
}