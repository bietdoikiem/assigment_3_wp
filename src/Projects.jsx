import React from 'react';
import {Modal, Button, Card} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import ReadMoreAndLess from 'react-read-more-less';


const URL = "http://13.59.166.121:5000/projects"
const URL_Course = "http://13.59.166.121:5000/courses"
const formData = new FormData();


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
            assignmentName: '',
            assignmentDescription: '',
            assignmentPercentage: '',
            technology: '',
            scope: '',
            description: '',
            industry: '',
            application: '',
            Photo: [],
            thumbnail: null,
            modalIsOpen: false,
            pageNo: 1,
            size: 4,
            keyword: '',
            category: '',
            isAuthenticated: 0,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false, thumbnail: null });  
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
        })
    }
    handleImageChange(event) {
        this.setState({
          thumbnail: window.URL.createObjectURL(event.target.files[0])
        })
        
      }
    handleCategoryChange(e){ {/* Handle nested change */}
        this.setState({course: {
            id: e.target.value
        }});  
    }
    handleCategorySearch(e){ {/* Handle nested change */}
        this.setState({category: e.target.value })
    }
    fetchProjects(){
        var query_URL = `${URL}?pageNo=${this.state.pageNo}&size=${this.state.size}` 
        fetch(query_URL)
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
        const values = queryString.parse(this.props.location.search)
        if (values.pageNo >= 1){
            this.setState({pageNo: values.pageNo}, ()=>console.log(this.state.pageNo))
        }
        setTimeout(
            function() {
                this.fetchProjects();
                this.fetchCourses();
            }
            .bind(this),
            50
        );
    }
    componentWillMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')}, () => console.log(this.state.isAuthenticated))
        
    }


    save(event){
        event.preventDefault();
        this.setState({ modalIsOpen: false});
        var method = 'POST'
        var formData = new FormData();
        var photo = document.querySelector('input[type="file"]');
        formData.append('name', this.state.name);
        formData.append('studentId', this.state.student.id);
        formData.append('courseId', this.state.course.id);
        formData.append('semester', this.state.semester);
        formData.append('assignmentName', this.state.assignmentName);
        formData.append('assignmentDescription', this.state.assignmentDescription);
        formData.append('assignmentPercentage', this.state.assignmentPercentage);
        formData.append('technology', this.state.technology);
        formData.append('scope', this.state.scope);
        formData.append('description', this.state.description);
        formData.append('industry', this.state.industry);
        formData.append('application', this.state.application);
        formData.append('Thumbnail', photo.files[0]);
    if (formData.get('studentId') !== '' && formData.get('courseId') !== '' && formData.get('name') !== '' && formData.get('Thumbnail') !== null && formData.get('Thumbnail') !== 'undefined'){
        console.log(formData.get('Thumbnail'))
       axios({
        url : URL,
        method : 'POST',
        headers : {
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(response=>{
        if (response.data === 'Student not found'){
            alert("Invalid Student's ID. Please check the Students' Category")
        }
        else{
            alert("Project created successfully")
        }
    })
    .then(() => {
        setTimeout(this.fetchProjects(), 10000)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }else{
        alert("Please fill in all the required fields (*)")
    }
    }
    searchResult(event){
        event.preventDefault();
        if (this.state.category == ''){
        return this.props.history.push(`/search?k=${this.state.keyword}`)
        }
        else if (this.state.keyword == ''){
            return this.props.history.push(`/search?cId=${this.state.category}`)
        }
        else if (typeof this.state.category !== 'undefined' && this.state.category !== '' && typeof this.state.keyword !== 'undefined' && this.state.keyword !== ''){
            return this.props.history.push(`/search?k=${this.state.keyword}&cId=${this.state.category}`)
        }
    }

    render(){
        return(
            <div>
                {this.state.isAuthenticated == 1 && 
                <div className=" mt-2">
                    <Button variant="primary"  onClick={this.openModal}>
                        Add a project &nbsp;<i class='fas fa-plus'></i>
                    </Button>
                </div>}
                <form class="form-inline md-form form-sm active-cyan active-cyan-2 mt-3">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input class="form-control form-control-sm ml-3" type="text" name="keyword" value={this.state.keyword} placeholder="Enter project's name"
                        aria-label="Search" onChange={this.handleChange.bind(this)} />
                    <i class="fa fa-list-alt ml-3" aria-hidden="true"></i>
                    <select class="form-control form-control-sm ml-3" onChange={this.handleCategorySearch.bind(this)} value={this.state.category}>
                            <option value="">--Select Category--</option>
                            {this.state.courses.map(c =>
                                <option value={c.id}>{c.id} - {c.name}</option>)}
                    </select>
                    <Button type="submit" variant="primary ml-3 h-5" onClick={this.searchResult.bind(this)}>Search</Button>
                </form>
                {/* Card display */}
                <br/>
                {this.state.projects.data?.map((p) =>  
                    <div>
                        <div className="zoom">
                            <div class="card mb-3">
                                <img src={`http://13.59.166.121:5000${p.Thumbnail}`} height="200" width="1100" class="card-img-top" alt="Thumbnail" style={{ objectFit: "cover", height: "350px" }} />
                                <div class="card-body">
                                    <h5 class="card-title">{p.name}</h5>
                                    <ReadMoreAndLess
                                        ref={this.ReadMore}
                                        className="read-more-content"
                                        charLimit={145}
                                        readMoreText=""
                                        readLessText="Read less"
                                    >
                                        {p.description}
                                    </ReadMoreAndLess>
                                    <Link to={`/projects/${p.id}`}><Button variant="danger mt-2">View Project &nbsp; <i class="fas fa-search"></i></Button></Link>
                                </div>
                            </div>
                        </div><br/>
                    </div> )}
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {this.state.projects.pages?.map(p => <div><li class="page-item">< a href={`/projects?pageNo=${p}`} class="page-link">{p}</a></li></div>)}
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* Modal Part*/}    
                <Modal size="lg" show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{color: "#007bff"}}>Add a project</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                        <form class="form" encType="multipart/form-data">
                                <div class="form-row"> {/* First row */}
                                    <div class="form-group col-md-6">
                                        Project's Name:<span style={{color: "red"}}>*</span> <input class="form-control form-control-sm" type="text" name="name" placeholder="Enter project's name" value={this.state.name} onChange={this.handleChange.bind(this)} ></input><br/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        Select a Course:<span style={{color: "red"}}>*</span> <select class="form-control form-control-sm" onChange={this.handleCategoryChange.bind(this)} value={this.state.course.id}>
                                            <option value="">--Select Category--</option>
                                            {this.state.courses.map(c =>
                                                <option value={c.id}>{c.id} - {c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            <div class="form-row"> {/* Second row */}
                                <div class="form-group col-md-6">
                                    Student's ID (Based on Students Category):<span style={{color: "red"}}>*</span> <input class="form-control form-control-sm form-control form-control-sm" type="text" name="studentId" placeholder="Enter student's ID" value={this.state.student.id} onChange={this.handleNestedJSONChange.bind(this)} ></input><br />
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
                                Thumbnail Image:<span style={{color: "red"}}>*</span> <input class="form-control-file form-control-sm" type="file" onChange={this.handleImageChange}></input> <img height="200" width="200" src={this.state.thumbnail} alt="Image preview..." /> <br /> 
                                Project's Description: <textarea class="form-control" rows="4" cols="50" name="description" placeholder="Anything to describe your work" value={this.state.description} onChange={this.handleChange.bind(this)} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button type="submit" variant="danger" onClick={this.save.bind(this)}>
                            Add project
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}