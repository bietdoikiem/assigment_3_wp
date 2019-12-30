import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const URL = "http://localhost:5000/projects"
const URL_Course = "http://localhost:5000/courses"
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');


export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            courses: [],
            name: '',
            student: {
                id: ''
            },
            course: {
                id: ''
            },
            semester: '',
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
    handleNestedJSONChange(e){
        this.setState({student: {
            id: e.target.value
        }
        }, () => console.log(this.state.student.id))
    }
    handleCategoryChange(e){ {/*  */}
        this.setState({course: {
            id: e.target.value
        }});  
    }

    fetchProjects(){
        fetch(URL)
        .then(res=>res.json())
        .then(json=>{
            this.setState({projects: json})   
    })
    }
    
    fetchCourses(){
        fetch(URL_Course)
        .then(res=>res.json())
        .then(json=>{
            this.setState({courses: json})   
    })
    }

    componentDidMount(){
        this.fetchProjects();
        this.fetchCourses();
    }

    save(event){
        event.preventDefault();
        this.setState({ modalIsOpen: false});
        var method = 'POST'
        fetch(URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.name,
                student: {
                    id: this.state.student.id
                },
                course: {
                    id: this.state.course.id
                },
                semester: this.state.semester,
                assignment: this.state.assignment,
                technology: this.state.technology,
                scope: this.state.scope,
                description: this.state.description,
                industry: this.state.industry,
                application: this.state.application
            })
        }).then(res=>res.json()) // get the result and convert it to json format.
         var formData = new FormData();
         var photos = document.querySelector('input[type="file"][multiple]');
        for (let i = 0; i < photos.files.length; i++) {
            formData.append('Photo', photos.files[i]);
        }
        fetch(URL, {
            method: method,
            body: formData,
        })
        .then(res=>res.json())
        .then((result) => {
            console.log('Success:', result);
          })
        .then(json=>this.fetchProjects())  
        .catch((error) => {
            console.error('Error:', error);
          }); // .then syntax to finish the previous part and continue next.
    }

    render(){
        return(
            <div>
                <div class="float-left mt-2">
                    <Button variant="primary"  onClick={this.openModal}>
                        Add a project &nbsp;<i class='fas fa-plus'></i>
                    </Button>
                </div>

                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{color: "#007bff"}}>Add a project</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form class="form" encType="multipart/form-data">
                                <div class="form-group">
                                    Name: <input class="form-control form-control-sm" type="text" name="name" placeholder="Enter project's name" value={this.state.name} onChange={this.handleChange.bind(this)} ></input><br/>
                                </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    Student's ID: <input class="form-control form-control-sm form-control form-control-sm" type="text" name="studentId" placeholder="Enter student's ID" value={this.state.student.id} onChange={this.handleNestedJSONChange.bind(this)} ></input><br />
                                </div>
                                <div class="form-group col-md-6">
                                    Select a Course: <select class="form-control form-control-sm" onChange={this.handleCategoryChange.bind(this)} value={this.state.course.id}>
                                        <option value="">--Select Category--</option>
                                        {this.state.courses.map(c =>
                                            <option value={c.id}>{c.id} - {c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    Semester: <input class="form-control form-control-sm" type="text" name="semester" placeholder="Which semester?" value={this.state.semester} onChange={this.handleChange.bind(this)} ></input><br />
                                </div>
                                <div class="form-group col-md-6">
                                    Assignment: <input class="form-control form-control-sm" type="text" name="assignment" placeholder="Which assignment?" value={this.state.assignment} onChange={this.handleChange.bind(this)} ></input><br />
                                </div>
                            </div>
                            <div class="form-group">
                                Technology: <input class="form-control form-control-sm" type="text" name="technology" placeholder="Enter used technology" value={this.state.technology} onChange={this.handleChange.bind(this)} ></input><br />
                                Scope: <input class="form-control form-control-sm" type="text" name="scope" placeholder="Enter scopes" value={this.state.scope} onChange={this.handleChange.bind(this)} ></input><br />
                                Industry (optional): <input class="form-control form-control-sm" type="text" name="industry" placeholder="Enter industry" value={this.state.industry} onChange={this.handleChange.bind(this)} ></input><br />
                                Application (optional): <input class="form-control form-control-sm" type="text" name="application" placeholder="What is it application ?" value={this.state.application} onChange={this.handleChange.bind(this)} ></input><br />
                                Photo: <input multiple class="form-control-file form-control-sm" type="file" name="Photo"></input><br />
                                Description: <textarea class="form-control" rows="4" cols="50" name="description" placeholder="Anything to describe your work" value={this.state.description} onChange={this.handleChange.bind(this)} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.save.bind(this)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}