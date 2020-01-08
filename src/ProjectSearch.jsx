import React from 'react';
import {Modal, Button, Card} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import ReadMoreAndLess from 'react-read-more-less';


const URL = "http://13.59.166.121:5000/projects"



export default class ProjectSearch extends React.Component{
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
        }
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
    fetchSearch(){
        var query_URL = `${URL}/all/filter?name=${this.state.keyword}&cId=${this.state.category}` 
        fetch(query_URL)
        .then(res=>res.json())
        .then(json=>{
            this.setState({projects: json})   
    })
    }

    
    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        console.log(values)
        if (typeof values.cId === 'undefined' && values.k !== ''){
            this.setState({keyword: values.k}, () => { console.log(this.state.keyword); console.log(this.state.category)})
        }
        else if (typeof values.k === 'undefined'&& values.cId !== ''){
            this.setState({category: values.cId}, () => { console.log(this.state.keyword); console.log(this.state.category)})
        }
        else{
            this.setState({keyword: values.k, category: values.cId}, () => console.log(`${this.state.keyword} and ${this.state.category}`))
        }
        setTimeout(
            function() {
                this.fetchSearch();
            }
            .bind(this),
            50
        );
    }


    render(){
        return(
            <div>
                <div className=" mt-2">
                    <Link to ="/projects"><Button variant="primary">
                        Return
                    </Button></Link>
                </div>
                {/* Card display */}
                <br/>
                {this.state.projects?.map((p) =>  
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
            </div>
        )
    }
}