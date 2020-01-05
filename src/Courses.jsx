import React from 'react';
import {BrowserRouter, Switch, Redirect, Route,Link} from 'react-router-dom'
import Add_co from './Add_course.jsx'


export default class Courses extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            courses: [],
            id: '',
            name: '',
            Course_Photo:'',
            grid_view:false
 
        }
    }
    fetchData(){
        var url = 'http://localhost:5000/courses'
        fetch(url)
            .then(res=>res.json())
            .then(json=>this.setState({courses: json}))
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
    save(){
        
     var url ='http://localhost:5000/courses'
     fetch(url,{
         method:'POST',
         headers: {
             'Content-type': 'application/json',
             'Accept' : 'application/json'
         },
         body: JSON.stringify({id:this.state.id, name: this.state.name  })
     }).then(res => res.json())
          .then(json=> this.fetchData())
     }
     Update(id){
        
        var url ='http://localhost:5000/courses'
        fetch(url+ "/"+id,{
            method:'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({id:this.state.id, name: this.state.name  })
        }).then(res => res.json())
             .then(json=> this.fetchData())
        }
    delete(id){
        var url ='http://localhost:5000/courses'
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
        let photo = 'localhost:5000'+this.state.Course_Photo
        const {grid_view} = this.state.grid_view
        return(
            <div>
                <BrowserRouter>
                        <div id="btnContainer">
                            <button class="btn active" onClick= {this.list_view.bind(this)} ><i class="fa fa-bars"></i> List</button> 
                            <button class="btn active" onClick={this.grid_view.bind(this)} ><i class="fa fa-th-large"></i> Grid</button>
                        </div>
                        <br></br>
                <div className='grid-container'>
                {/*the form for displaying courses info as grid*/}
                {this.state.courses.map(s=>
                    <div>
                        { this.state.grid_view === true ?
                            <div className="course" >
                                <img  class="card-img-top" src={'http://localhost:5000'+s.Course_Photo} />
                                <div class="card-body">
                                <h5 class="card-title">{s.name}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            : null
                        }
                      
                        <br/>
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
                                            <label for="course_id">Change code of this course</label>
                                            <input type="text" class="form-control" name='id' id="course_id" placeholder={s.id} value={this.state.id}
                                            onChange={this.handleChange.bind(this)} />    
                                        </div>
                                        <div className="form-group">
                                            <label for="Coursename">Courses name</label>
                                            <input type="Text" class="form-control" name='name' id="Coursename" placeholder={s.name} 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                    <div className ='modal-footer'>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" >Close</button>
                                        <Link to='/courses'><button type='button' className='btn btn-sm btn-outline-success' onClick={this.Update.bind(this,s.id)} data-dismiss="modal">Save</button></Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
               )}
               </div>
                {/*the form for displaying courses info*/}
                {this.state.courses.map(s=>
                    <div>
                        { this.state.grid_view === false ?
                            <div className="card" >
                            <div className="card-body">
                                <h5 class="card-title">{s.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{s.id}</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_course_modal">Add Course</button>
                                <div className ='divider' ></div>
                                <button type='button' class='btn btn-danger' onClick={this.delete.bind(this,s.id)} >Delete</button>
                                <div className ='divider' />
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_course_modal">Update Courses</button>
                            </div>
                            </div>
                            : null
                        }
                      
                        <br/>
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
                                            <label for="course_id">Change code of this course</label>
                                            <input type="text" class="form-control" name='id' id="course_id" placeholder={s.id} value={this.state.id}
                                            onChange={this.handleChange.bind(this)} />    
                                        </div>
                                        <div className="form-group">
                                            <label for="Coursename">Courses name</label>
                                            <input type="Text" class="form-control" name='name' id="Coursename" placeholder={s.name} 
                                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                    <div className ='modal-footer'>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" >Close</button>
                                        <Link to='/courses'><button type='button' className='btn btn-sm btn-outline-success' onClick={this.Update.bind(this,s.id)} data-dismiss="modal">Save</button></Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
               )}
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
                                    </div>
                                    <div class ='modal-footer'>
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" >Close</button>
                                        <Link to='/courses'><button type='button' className='btn btn-sm btn-outline-success' onClick={this.save.bind(this)} data-dismiss="modal">Save</button></Link>
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

