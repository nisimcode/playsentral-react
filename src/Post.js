// import React from 'react';
// import {ListGroup} from "react-bootstrap";
// import Button from "react-bootstrap/Button";
//
// export class Post extends React.Component {
//
//     render() {
//         return (
//              <ListGroup.Item key={this.props.post.post_id}
//                 as="li" className="d-flex justify-content-between align-items-start" style={{width: '500px'}}>
//                <div className="ms-2 me-auto">
//                     <div className="fw-bold">{this.props.post.text} </div>
//                     <div style={{fontStyle: "italic"}}>{this.props.post.username}</div>
//                     <Button
//                         variant={'primary'} size={'sm'} style={{width: '90px', height: '30px'}}
//                         onClick={() =>
//                             window.location.href = `${this.props.post.game_id}/posts/${this.props.post.post_id}`}>
//                         Comments
//                     </Button>
//                     &ensp;
//                     <Button
//                         variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
//                         hidden={this.props.post.username!== this.state.username}
//                         onClick={() => {this.setState
//                                     ({showPostModal: true,
//                                             currPostId: this.props.post.post_id,
//                                             text: this.props.post.text})}}>
//                         Edit
//                     </Button>
//                     &ensp;
//                     <Button
//                         variant={'outline-primary'} size={'sm'} style={{width: '60px', height: '30px'}}
//                         hidden={this.props.post.username !== this.state.username}
//                         onClick={() => this.handleDeletePost(this.props.post.id)}>
//                         Delete
//                     </Button>
//                 </div>
//             </ListGroup.Item>
//         )
//     }
// }
