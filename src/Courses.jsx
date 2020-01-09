import React from 'react';
import {BrowserRouter, Switch, Redirect, Route,Link} from 'react-router-dom'
import Add_co from './Add_course.jsx'
import axios from 'axios';


export default class Courses extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            courses: [],
            id: '',
            name: '',
            Course_Photo:'',
            description: '',
            grid_view:false,
            isAuthenticated: 0,
            token: '',
        }
    }
    fetchData(){
        var url = 'http://13.59.166.121:5000/courses'
        fetch(url)
            .then(res=>res.json())
            .then(json=>this.setState({courses: json}))
    }    
    componentDidMount(){
        this.fetchData()
    }
    componentWillMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')}, () => console.log(this.state.isAuthenticated))
        this.setState({token: window.sessionStorage.getItem('token')})
    }
    handleChange(e){
        e.preventDefault();
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    handleImageChange(event) {
        this.setState({
            Course_Photo: window.URL.createObjectURL(event.target.files[0])
        })
        
      }
      edit(id,name,description){
        this.setState({id : id, name: name,description: description})
    }
    save(event){
        var url = 'http://13.59.166.121:5000/courses'
        event.preventDefault();
        this.setState({ modalIsOpen: false});
        var method = 'POST'
        var formData = new FormData();
        var photo = document.querySelector('#addcourse');
        formData.append('id', this.state.id);
        formData.append('name', this.state.name);
        formData.append('Course_Photo', photo.files[0]);
        formData.append('description',this.state.description );
       axios({
        url : url,
        method : 'POST',
        headers : {
            "Authorization" : `Bearer ${this.state.token}`,
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        alert('create course successfully')
        setTimeout(this.fetchData(), 10000)

    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
    Update(){
        
        var url ='http://13.59.166.121:5000/courses' +'/'+this.state.id
        this.setState({ modalIsOpen: false});
        var method = 'PUT'
        var formData = new FormData();
        var photo = document.querySelector('#updatecourse');
        formData.append('name', this.state.name);
        formData.append('Course_Photo', photo.files[0]);
        formData.append('description',this.state.description );
       axios({
        url : url,
        method : 'PUT',
        headers : {
            "Authorization" : `Bearer ${this.state.token}`,
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        alert('update course successfully')
        setTimeout(this.fetchData(), 10000)

    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
    delete(id){
        var url ='http://13.59.166.121:5000/courses'
        if(window.confirm('Are you sure you want to delete this courses '))
        {
            fetch(url + "/"+id, {
                headers: {
                    "Authorization" : `Bearer ${this.state.token}`
                },
                method: 'delete',
            }).then(res=>res.json())
            .then(() => {
                setTimeout(this.fetchData(), 10000)
        
            })
        }
        }
    list_view(event){
        this.setState({grid_view:false})
    }
    grid_view(event){
        this.setState({grid_view:true})
        console.log('it worked')
    }
    render(){
        const {grid_view} = this.state.grid_view
        return(
            <div>
                <BrowserRouter>
                        <div id="btnContainer">
                            <button class="btn active move-listbtn" onClick= {this.list_view.bind(this)} ><i class="fa fa-bars"></i> List</button> 
                            <button class="btn active" onClick={this.grid_view.bind(this)} ><i class="fa fa-th-large"></i> Grid</button>
                            <br/>
                            <br/>
                            {this.state.isAuthenticated == 1 && <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_course_modal" ><i class="fas fa-plus"></i> Add courses</button>}
                        </div>
                        
                <div className='grid-container'>
                {/*the form for displaying courses info as grid*/}
                {this.state.courses.map(s=>
                    <div>
                        { this.state.grid_view === true ?
                            <div className="course" >
                                <img  class="card-img-top" src={'http://13.59.166.121:5000'+s.Course_Photo} />
                                <div class="card-body">
                                <h5 class="card-title">{s.name}</h5>
                                <h5 class="card-title">{s.description}</h5>
                                <button type='button' class='btn btn-danger' onClick={this.delete.bind(this,s.id)} >Delete</button>
                                <br/>
                                <br/>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_course_modal" onClick={this.edit.bind(this,s.id,s.name,s.description)}>Update Courses</button>
                                    
                                </div>
                            </div>
                            : null
                        }
                      
                        <br/>

                        
                    </div>
               )}
               </div>
                {/*the form for displaying courses list*/}
                {this.state.courses.map(s=>
                    <div>
                        { this.state.grid_view === false ?
                            <div className="card" >
                            <div className="card-body">
                            <img src={'http://13.59.166.121:5000'+s.Course_Photo} class="rounded float-left"/>
                                <h5 className="card-title">{s.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{s.id}</h6>
                                <h5 class="card-title">{s.description}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {this.state.isAuthenticated == 1 && <button type='button' class='btn btn-danger' onClick={this.delete.bind(this,s.id)} >Delete</button>}
                                <div className ='divider' />
                                {this.state.isAuthenticated == 1 &&<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_course_modal" onClick={this.edit.bind(this,s.id,s.name,s.description)}>Update Courses</button>}
                            </div>
                            </div>
                            : null
                        }
                      
                        <br/>
                        
                    </div>
               )}
                <div>
                        {/*Modal for updating courses*/}
                        <div className="modal fade" id="update_course_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-centered"  >
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLongTitle">Update course</h3>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label for="Coursename">Courses name</label>
                                            <input type="Text" class="form-control" name='name' id="Coursename" placeholder='' 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div className="form-group">
                                            <label for="CourseDe">Courses description</label>
                                            <input type="Text" class="form-control" name='description' id="CourseDe" placeholder='' 
                                            value={this.state.description} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <input className="form-control-file form-control-sm" type="file" id="updatecourse" onChange={this.handleImageChange.bind(this)}></input> {this.state.Course_Photo ?<img height="200" width="200" src={this.state.Course_Photo} alt="Image preview..." /> : ''}
                                    </div>
                                    <div className ='modal-footer'>
                                        <button type="submit" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                        <Link to='/courses'><button type='button' className='btn btn-danger' onClick={this.Update.bind(this)} data-dismiss="modal">Save</button></Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
               <div>
                        {/*Modal for adding courses*/}
                        <div class="modal fade" id="add_course_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                            <div class="modal-dialog modal-dialog-centered"  >
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h3 class="modal-title" id="exampleModalLongTitle">Add course</h3>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="course_id">Type code of your courses</label>
                                            <input type="text" class="form-control" name='id' id="course_id" placeholder="Enter Course's code" value={this.state.id}
                                            onChange={this.handleChange.bind(this)} />    
                                        </div>
                                        <div class="form-group">
                                            <label for="Coursename">Courses name</label>
                                            <input type="Text" class="form-control" name='name' id="Coursename" placeholder="Type your coursename" 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <input className="form-control-file form-control-sm" type="file" id="addcourse" onChange={this.handleImageChange.bind(this)}></input> {this.state.Course_Photo ?<img height="200" width="200" src={this.state.Course_Photo} alt="Image preview..." /> : '' }
                                    </div>
                                    <div class ='modal-footer'>
                                        <button type="submit" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                                        <Link to='/courses'><button type='button' className='btn btn-danger' onClick={this.save.bind(this)} data-dismiss="modal">Save</button></Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                
                </BrowserRouter>
            </div>
        )
    }
}

