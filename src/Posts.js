// import axios from 'axios';
// import React from 'react';
// import {Button, Form, FormControl, ListGroup} from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import { Header } from './Header';
// import {GAMES_URL, POSTS_URL, TOKEN_URL} from './request_utils';
// import ReactPaginate from "react-paginate";
// import {cloneDeep} from "lodash";
// import {SearchBar} from "./SearchBar";
//
// export class Posts extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             posts: [],
//             offset: 0,
//             perPage: 5,
//             currentPage: 0,
//         }
//
//         this.handlePageClick = this.handlePageClick.bind(this)
//         this.getPosts = this.getPosts.bind(this)
//         this.paginatePosts = this.paginatePosts.bind(this)
//
//    }
//
//     getPosts() {
//         console.log('getting posts')
//         axios
//         .get(POSTS_URL)
//         .then(response => {
//             console.log(response)
//             if (response.status !== 200) {
//                 console.log('failed getting posts');
//             } else {
//                 this.setState({posts: response.data})
//                 console.log(this.state.posts)
//                 this.paginatePosts()
//     }})}
//
//      paginatePosts() {
//          const slice = this.state.posts.slice(this.state.offset, this.state.offset + this.state.perPage)
//          const postData = slice.map(post =>
//              <React.Fragment key={post.id}>
//                  <ListGroup.Item
//                      as="li" className="d-flex justify-content-between align-items-start"
//                      onClick={() => window.location.href = `posts/${post.id}/details`}>
//                      <div className="ms-2 me-auto">
//                          <div className="fw-bold">{post.text}</div>
//                          {post.game}
//                          <div style={{fontStyle: "italic"}}>{post.user}</div>
//                      </div>
//                  </ListGroup.Item>
//              </React.Fragment>
//          )
//          this.setState({pageCount: Math.ceil(this.state.posts.length / this.state.perPage), postData})
//      }
//
//     componentDidMount() {
//         this.getPosts()
//     }
//
//
//     handlePageClick = (event) => {
//         const selectedPage = event.selected;
//         const offset = selectedPage * this.state.perPage;
//
//         this.setState({
//             currentPage: selectedPage,
//             offset: offset
//         }, () => {
//             this.getPosts()
//         })
//     }
//
//
//     render() {
//
//         return(
//             <>
//                 <Header />
//                 {/*<SearchBar db={this.state.games}/>*/}
//
//                 {this.state.postData}
//                 <ReactPaginate
//                     previousLabel={"prev"}
//                     nextLabel={"next"}
//                     breakLabel={"..."}
//                     breakClassName={"break-me"}
//                     pageCount={this.state.pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={this.handlePageClick}
//                     containerClassName={"pagination"}
//                     subContainerClassName={"pages pagination"}
//                     activeClassName={"active"}/>
//             </>
//         )
//     }
// }