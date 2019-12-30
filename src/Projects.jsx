import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            student:{
                id: ''
            },
            course: {
                id: '',
                name: ''
            },
            assignment: '',
            technology: '',
            scope: '',
            description: '',
            industry: '',
            application: '',
            Photo: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    handleChange(e){
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    handleCategoryChange(event){
        this.setState({'course.id': event.target.value, 'course.name': event.target.value});
    }

    render(){
        return(
            <div>
                <p>Projects Page</p>
                <div class="float-left">
                    <Button variant="primary" onClick={this.openModal}>
                        Add a project
                    </Button>
                </div>

                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{color: "#007bff"}}>Add a project</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            Name: <input type="text" name="name" placeholder="Enter project's name" value={this.state.name} onChange={this.handleChange.bind(this)} ></input><br/>
                            Student's ID: <input type="text" name="studentid" placeholder="Enter student's ID" value={this.state.student.id} onChange={this.handleChange.bind(this)} ></input><br/>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}