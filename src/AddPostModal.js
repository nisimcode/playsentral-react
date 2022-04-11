// import React from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form'
// import { Button } from 'react-bootstrap';
//
// export class AddPostModal extends React.Component {
//
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             text: "",
//         }
//     }
//
//
// render () {
//     return(
//     <Modal show={this.props.show} onHide={this.props.onAddPostClose}>
//     <Modal.Header closeButton>
//     <Modal.Title>New Post</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//     <Form>
//         <Form.Group className="mb-3">
//             <Form.Label>Post</Form.Label>
//             <Form.Text>
//                 <Form.Control
//                     type="text" placeholder="Enter text here..."
//                     value={this.state.text}
//                     onChange={(event) => this.setState({text: event.target.value})}/>
//             </Form.Text>
//         </Form.Group>
//     </Form>
//     </Modal.Body>
//     <Modal.Footer>
//     <Button variant="secondary" onClick={this.props.onAddPostClose}>
//         Cancel
//     </Button>
//     <Button variant="primary"
//         onClick={() => this.props.onSubmit(this.state.text)}>
//         Save Changes
//     </Button>
//     </Modal.Footer>
//     </Modal>
//     )
//
// }
// }
//
//         {/*<Form.Group className="mb-3">*/}
//         {/*    <Form.Label>Review</Form.Label>*/}
//         {/*    <Form.Text>*/}
//         {/*        <Form.Control */}
//         {/*            type="text" placeholder="Enter review here..." */}
//         {/*            value={this.state.review}*/}
//         {/*            onChange={(event) => this.setState({review: event.target.value})}/>*/}
//         {/*    </Form.Text>*/}
//         {/*</Form.Group>*/}
//         {/*<Form.Group>*/}
//         {/*    <Form.Label>Laptop</Form.Label>*/}
//         {/*    <Form.Select>*/}
//         {/*        {this.props.laptops.map(*/}
//         {/*            // this.getOption*/}
//         {/*            laptop => */}
//         {/*            {*/}
//         {/*                return(<option key={laptop.Id}>{laptop.Product}</option>)*/}
//         {/*            }*/}
//         {/*            )*/}
//         {/*        }*/}
//         {/*    </Form.Select>*/}
//         {/*</Form.Group>*/}
//
//
//         {/* <Button variant="primary" type="submit">
//             Submit
//         </Button> */}
