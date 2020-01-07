import React from 'react';
import {BrowserRouter, Switch, Redirect, Route,Link} from 'react-router-dom'
import Add_co from './Add_course.jsx'
import axios from 'axios';



export default class Students extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            students: [],
            id: '',
            name: '',
            year:'',
            Student_Photo:'',
            grid_view:false
 
        }
    }
    fetchData(){
        var url = 'http://localhost:5000/students'
        fetch(url)
            .then(res=>res.json())
            .then(json=>this.setState({students: json}))
    }    
    componentWillMount(){
        this.fetchData()
    }
 
    handleChange(e){
        e.preventDefault();
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    handleImageChange(event) {
        this.setState({
            Student_Photo: window.URL.createObjectURL(event.target.files[0])
        })
        
      }
      save(event){
        var url = 'http://localhost:5000/students'
        event.preventDefault();
        this.setState({ modalIsOpen: false});
        var method = 'POST'
        var formData = new FormData();
        var photo = document.querySelector('input[type="file"]');
        formData.append('id', this.state.id);
        formData.append('name', this.state.name);
        formData.append('year', this.state.year);
        formData.append('Student_Photo', photo.files[0]);
       axios({
        url : url,
        method : 'POST',
        headers : {
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        setTimeout(this.fetchData(), 10000)

    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
     Update(id){
        
        var url ='http://localhost:5000/students/'
        this.setState({ modalIsOpen: false});
        var method = 'POST'
        var formData = new FormData();
        var photo = document.querySelector('input[type="file"]');
        formData.append('name', this.state.name);
        formData.append('year', this.state.year);
        formData.append('Student_Photo', photo.files[0]);
       axios({
        url : url,
        method : 'PUT',
        headers : {
            "Content-Type" : "multipart/form-data"
        },
        data : formData
    })
    .then(() => {
        setTimeout(this.fetchUpdate(), 10000)

    })
    .catch(error => {
        if (error.response) {
            console.log(error.responderEnd);
        }
    });
    }
    delete(id){
        var url ='http://localhost:5000/students'
        if(window.confirm('Are you sure you want to delete this courses '))
        {
            fetch(url + "/"+id, {
                method: 'delete',
            }).then(res=>res.json())
            .then(json=>this.fetchData())
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
        return(
            <div>
                <BrowserRouter>
                        <div id="btnContainer">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add_student_modal" ><i className="fa fa-th-large"></i> Add students</button>
                        </div>
                        <br></br>      
                        <br/>
               <div>
                {/*the form for displaying student list*/}
                {this.state.students.map(s=>
                    <div>
                            <div className="card" >
                            <div className="card-body">
                            <img src={'http://localhost:5000'+s.Student_Photo} class="rounded-circle float-left"/>
                                <h5 className="card-title">{s.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{s.id}</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type='button' className='btn btn-danger' onClick={this.delete.bind(this,s.id)} >Delete</button>
                                <div className ='divider' />
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#update_student_modal">Update Student</button>
                            </div>
                            </div>
                        {/*Modal for updating students*/}
                        <div className="modal fade" id="update_student_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-centered"  >
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLongTitle">Update Students</h3>
                                    </div>
                                    <div className="modal-body">
                                        <div class="form-group">
                                            <label >Student name</label>
                                            <input type="Text" class="form-control" name='name'  placeholder="Type your Student name" 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div className="form-group">
                                            <label >Student year</label>
                                            <input type="Text" className="form-control" name='year'  placeholder="Type your StudentYear" 
                                            value={this.state.year} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <input className="form-control-file form-control-sm" type="file" onChange={this.handleImageChange.bind(this)}></input> <img height="200" width="200" src={this.state.Student_Photo} alt="Image preview..." /> <br />
                                    </div>
                                    <div class ='modal-footer'>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" >Close</button>
                                        <button type='button' className='btn btn-sm btn-outline-success' onClick={this.Update.bind(this,s.id)} data-dismiss="modal">Save</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>                
               )}
               <div>
                        {/*Modal for adding students*/}
                        <div className="modal fade" id="add_student_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-centered"  >
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLongTitle">Add Students</h3>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label >Id of this students</label>
                                            <input type="text" class="form-control" name='id'  placeholder="Enter student id" value={this.state.id}
                                            onChange={this.handleChange.bind(this)} />    
                                        </div>
                                        <div class="form-group">
                                            <label >Student name</label>
                                            <input type="Text" class="form-control" name='name'  placeholder="Type your Student name" 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div className="form-group">
                                            <label >Student year</label>
                                            <input type="Text" className="form-control" name='year'  placeholder="Type your StudentYear" 
                                            value={this.state.year} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <input className="form-control-file form-control-sm" type="file" onChange={this.handleImageChange.bind(this)}></input> <img height="200" width="200" src={this.state.Student_Photo} alt="Image preview..." /> <br />
                                    </div>
                                    <div class ='modal-footer'>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" >Close</button>
                                        <button type='button' className='btn btn-sm btn-outline-success' onClick={this.save.bind(this)} data-dismiss="modal">Save</button>
                                    </div>
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