import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { Carousel } from "react-responsive-carousel";
import ReadMoreAndLess from 'react-read-more-less';

export default class ProjectDetail extends React.Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            courses: [],
            name: '',
            student: {
                id: ''
            },
            course: {
                id: ''
            },
            semester: '',
            assignmentName: '',
            assignmentDescription: '',
            assignmentPercentage: '',
            technology: '',
            scope: '',
            description: '',
            industry: '',
            application: '',
            Photo: [],
            Video: '',
            file: [null],
            modalIsOpen: false,
            modalIsOpenVideo: false,
            modalIsOpenUpdate: false,
            isAuthenticated: 0,
            token: '',
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openVideoModal = this.openVideoModal.bind(this)
        this.closeVideoModal = this.closeVideoModal.bind(this)
        this.openUpdateModal = this.openUpdateModal.bind(this)
        this.closeUpdateModal = this.closeUpdateModal.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
            this.fileObj.length = 0
            this.fileArray.length = 0
            this.setState({file: [null]})
    }
    openVideoModal() {
        this.setState({ modalIsOpenVideo: true });
        
    }
    closeVideoModal() {
        this.setState({ modalIsOpenVideo: false });
    }
    openUpdateModal() {
        this.setState({ modalIsOpenUpdate: true });
        this.setState({
            name: this.state.project.name,
            student: {
                id: this.state.project.student.id
            },
            course: {
                id: this.state.project.course.id
            },
            semester: this.state.project.semester,
            assignmentName: this.state.project.assignment.name,
            assignmentDescription: this.state.project.assignment.description,
            assignmentPercentage: this.state.project.assignment.percentage,
            technology: this.state.project.technology,
            scope: this.state.project.scope,
            description: this.state.project.description,
            industry: this.state.project.industry,
            application: this.state.project.application,
        })
        
    }
    closeUpdateModal() {
        this.setState({ modalIsOpenUpdate: false });
    }

    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    handleNestedJSONChange(e) {
        this.setState({
            student: {
                id: e.target.value
            }
        })
    }
    handleImageChange(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(window.URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }
    handleCategoryChange(e) {
        {/* Handle nested change */ }
        this.setState({
            course: {
                id: e.target.value
            }
        });
    }
    fetchProject() {
        var URL = `http://13.59.166.121:5000/projects/${this.props.match.params.id}`
        fetch(URL)
            .then(res => res.json())
            .then(json =>this.setState({ project: json }))
    }
    fetchCourses() {
        var URL_Course = "http://13.59.166.121:5000/courses"
        fetch(URL_Course)
            .then(res => res.json())
            .then(json =>this.setState({ courses: json }))
    }


    save(event){
        var URL = `http://13.59.166.121:5000/projects/${this.props.match.params.id}`
        event.preventDefault();
        this.setState({ modalIsOpenUpdate: false});
        var method = 'PUT'
        fetch(URL, {
            method: method,
            headers: {
                "Authorization" : `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.name, 
                studentId: this.state.student.id,
                courseId: this.state.course.id,
                semester: this.state.semester,
                assignmentName: this.state.assignmentName,
                assignmentDescription: this.state.assignmentDescription,
                assignmentPercentage: this.state.assignmentPercentage,
                technology: this.state.technology,
                scope: this.state.scope,
                description: this.state.description,
                industry: this.state.industry,
                application: this.state.application,
             })
        }).then(res=>res.json()) // get the result and convert it to json format.
         .then(json =>this.fetchProject()) // .then syntax to finish the previous part and continue next.
    }

    saveImage(event){
        var URL = `http://13.59.166.121:5000/projects/${this.props.match.params.id}/photos`
        event.preventDefault();
        this.setState({ modalIsOpen: false});
        var method = 'PUT'
        var formData = new FormData();
        var photos = document.querySelector('#imgUpload');
        for (let i = 0; i < photos.files.length; i++) {
            formData.append('Photo', photos.files[i]);
        }        
       axios({
        url : URL,
        method : method,
        headers : {
            "Authorization" : `Bearer ${this.state.token}`,
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        alert('Uploaded image successfully')
        setTimeout(this.fetchProject(), 5000)
        window.location.reload(false);
    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
    saveVideo(event){
        var URL = `http://13.59.166.121:5000/projects/${this.props.match.params.id}/videos`
        event.preventDefault();
        this.setState({ modalIsOpenVideo: false});
        var method = 'PUT'
        var formData = new FormData();
        var videos = document.querySelector('#vidUpload');
        for (let i = 0; i < videos.files.length; i++) {
            formData.append('Video', videos.files[i]);
        }
       axios({
        url : URL,
        method : method,
        headers : {
            "Authorization" : `Bearer ${this.state.token}`,
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        alert('Uploaded Video succesfully')
        setTimeout(this.fetchProject(), 10000)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
    delete(){
        var URL = `http://13.59.166.121:5000/projects/${this.props.match.params.id}`
        if(window.confirm('Do you want to delete?')){
            fetch(URL, {
                headers: {
                    "Authorization" : `Bearer ${this.state.token}`,
                }, 
                method: 'delete'
            }) .then(res=>res.json())
            .then(alert("Project deleted successfully"))
            .then(this.props.history.push('/projects'))
        }
    }

    componentDidMount() {
        this.fetchProject();
        this.fetchCourses();
    }
    componentWillMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')})  
        this.setState({token: window.sessionStorage.getItem('token')})      
    }


    render() {
        return (
                <div style={{paddingBottom: "100px"}}>
                    <div class="row">
                        <div class="col-6 col-md-6 w-100 mt-2">
                            <div class="row">
                                <div class="col-6 col-md-6 w-100 mt-2">
                                    <h3  style={{color: "#252525"}}>Project Showcases</h3> 
                                </div>
                                {this.state.isAuthenticated == 1 &&
                                <div class="col-6 col-md-6 w-100 mt-2 ml-1">
                                    <Button variant="primary" onClick={this.openModal}>Add images <i class="fas fa-plus fa-xs"></i> <i class="fa fa-camera" aria-hidden="true"></i></Button>
                                </div>}
                            </div>
                            <br/>
                            <br/>
                            <Carousel autoPlay>
                                {this.state.project.Photo?.map(p => <div><img src={`http://13.59.166.121:5000${p}`} /></div>)}
                            </Carousel>
                            <h3 class="mt-1" style={{color: "#252525"}}>Project Videos</h3> 
                            {this.state.isAuthenticated == 1 &&
                            <Button variant="primary mt-2" onClick={this.openVideoModal}>Add videos  <i class="fas fa-plus fa-xs"></i> <i class="fa fa-video-camera" aria-hidden="true"></i></Button>}
                            {this.state.project.Video ? this.state.project.Video.map(url=>
                                <div class="showVideo mt-2">
                                    <video src={`http://13.59.166.121:5000${url}`} width="510" height="286" preload="metadata" controls />
                                </div>) : '' }

                        </div>
                        
                        <div class="col-6 col-md-6 w-100">
                            <div class="mt-3">        
                            {this.state.isAuthenticated == 1 && <div><h3 class="d-inline" style={{color: "#252525"}}>{this.state.project.name}</h3><Button variant="primary ml-3 mb-2" onClick={this.openUpdateModal}>Edit <i class="fas fa-edit"></i></Button><Button variant="danger ml-2 mb-2" onClick={this.delete.bind(this)}>Delete <i class="far fa-trash-alt"></i></Button></div>}
                            {this.state.isAuthenticated == 0 && <div><h3 class="d-inline" style={{color: "#252525"}}>{this.state.project.name}</h3></div>}
                                <div>
                                    {this.state.project.student ? <small style={{color: "#999999"}}>by {this.state.project.student.name} - {this.state.project.student.id} ({this.state.project.student.year}) - {this.state.project.course.id} ({this.state.project.semester}) </small> : '' }
                                </div>
                            </div>
                            <div class="card mt-2" style={{height: "90%"}}>
                            <div class="card-header" style={{backgroundColor: "#007bff"}}>
                                <ul class="nav nav-tabs card-header-tabs pull-left" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" style={{color: "#252525"}}>Description</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false" style={{color: "#252525"}}>Assignment</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" style={{color: "#252525"}}>Scopes</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="other-tab" data-toggle="tab" href="#other" role="tab" aria-controls="other" aria-selected="true" style={{color: "#252525"}}>Other</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        {this.state.project.description ? 
                                        <ReadMoreAndLess
                                        ref={this.ReadMore}
                                        className="read-more-content"
                                        charLimit={1230}
                                        readMoreText="Read more"
                                        readLessText="Read less"
                                        >
                                            {this.state.project.description}
                                        </ReadMoreAndLess> : '' }
                                        <br/>
                                    </div>
                                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">{this.state.project.scope}</div>
                                    {this.state.project.assignment ? <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <li><b>Name</b>: {this.state.project.assignment.name}</li>
                                        <hr/>
                                        <li><b>Description</b>: {this.state.project.assignment.description}</li>
                                        <hr/>
                                        <li><b>Percentage</b>: {this.state.project.assignment.percentage}</li>
                                    </div> : '' }
                                    {this.state.project.technology ? <><div class="tab-pane fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                                        <li><b>Technology</b>: {this.state.project.technology}</li>
                                        <hr/>
                                        <li><b>Industry</b>: {this.state.project.industry}</li>
                                        <hr/>
                                        <li><b>Application</b>: {this.state.project.application}</li>
                                    </div></> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Image Upload Modal*/}
                    <Modal size="lg" show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><span style={{ color: "#007bff" }}>Add a project</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form class="form" encType="multipart/form-data">
                                <div class="form-group">
                                    <b>Images/Videos to be displayed (Please select multiple at once for corrected preview):</b> <input id= "imgUpload" class="form-control-file form-control-sm" type="file" onChange={this.handleImageChange} multiple></input>
                                    <div className="form-group multi-preview">
                                        {(this.fileArray || []).map(url => (
                                            <img class="d-inline rounded mt-2" width="200" height="200" src={url} alt="..." />
                                        ))}
                                    </div>                             
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={this.saveImage.bind(this)}>
                                Add images
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Video Upload Modal */}
                    <Modal size="lg" show={this.state.modalIsOpenVideo} onHide={this.closeVideoModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><span style={{ color: "#007bff" }}>Add a Video</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form class="form" encType="multipart/form-data">
                                <div class="form-group">
                                    <b>Videos to be showcased:</b> <input id="vidUpload" class="form-control-file form-control-sm" type="file" onChange={this.handleImageChange} multiple></input>
                                    <div className="form-group multi-preview">
                                        {(this.fileArray || []).map(url => (
                                            <img class="d-inline rounded mt-2" width="200" height="200" src={url} alt="..." />
                                        ))}
                                    </div>                             
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeVideoModal}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={this.saveVideo.bind(this)}>
                                Add project
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Update Form Modal */}
                    <Modal size="lg" show={this.state.modalIsOpenUpdate} onHide={this.closeUpdateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><span style={{ color: "#007bff" }}>Edit the project</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form class="form" encType="multipart/form-data">
                                <div class="form-row"> {/* First row */}
                                    <div class="form-group col-md-6">
                                        Name: <input class="form-control form-control-sm" type="text" name="name" placeholder="Enter project's name" value={this.state.name} onChange={this.handleChange.bind(this)} ></input><br />
                                    </div>
                                    <div class="form-group col-md-6">
                                        Select a Course: <select class="form-control form-control-sm" onChange={this.handleCategoryChange.bind(this)} value={this.state.course.id}>
                                            <option value="">--Select Category--</option>
                                            {this.state.courses.map(c =>
                                                <option value={c.id}>{c.id} - {c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row"> {/* Second row */}
                                    <div class="form-group col-md-6">
                                        Student's ID: <input class="form-control form-control-sm form-control form-control-sm" type="text" name="studentId" placeholder="Enter student's ID" value={this.state.student.id} onChange={this.handleNestedJSONChange.bind(this)} ></input><br />
                                    </div>
                                    <div class="form-group col-md-6">
                                        Semester: <input class="form-control form-control-sm" type="text" name="semester" placeholder="Which semester?" value={this.state.semester} onChange={this.handleChange.bind(this)} ></input><br />
                                    </div>
                                </div>
                                <div class="form-row"> {/* Third row */}
                                    <div class="form-group col-md-4">
                                        Assignment: <input class="form-control form-control-sm" type="text" name="assignmentName" placeholder="Name of assignment" value={this.state.assignmentName} onChange={this.handleChange.bind(this)} ></input><br />
                                    </div>
                                    <div class="form-group col-md-4">
                                        Description: <input class="form-control form-control-sm" type="text" name="assignmentDescription" placeholder="Description of assignment" value={this.state.assignmentDescription} onChange={this.handleChange.bind(this)} ></input><br />
                                    </div>
                                    <div class="form-group col-md-4">
                                        Percentage: <input class="form-control form-control-sm" type="number" min="0" max="100" name="assignmentPercentage" placeholder="Percentage of assignment" value={this.state.assignmentPercentage} onChange={this.handleChange.bind(this)} ></input><br />
                                    </div>
                                </div>
                                <div class="form-group">
                                    Technology: <input class="form-control form-control-sm" type="text" name="technology" placeholder="Enter used technology" value={this.state.technology} onChange={this.handleChange.bind(this)} ></input><br />
                                    Scope: <input class="form-control form-control-sm" type="text" name="scope" placeholder="Enter scopes" value={this.state.scope} onChange={this.handleChange.bind(this)} ></input><br />
                                    Industry (optional): <input class="form-control form-control-sm" type="text" name="industry" placeholder="Enter industry" value={this.state.industry} onChange={this.handleChange.bind(this)} ></input><br />
                                    Application (optional): <input class="form-control form-control-sm" type="text" name="application" placeholder="What is it application ?" value={this.state.application} onChange={this.handleChange.bind(this)} ></input><br />
                                    Project's Description: <textarea class="form-control" rows="4" cols="50" name="description" placeholder="Anything to describe your work" value={this.state.description} onChange={this.handleChange.bind(this)} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeUpdateModal}>
                                Close
                        </Button>
                            <Button type="submit" variant="primary" onClick={this.save.bind(this)}>
                                Edit Project
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                </div>
        )
    }
}