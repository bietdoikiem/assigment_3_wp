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
            add:false,
            delete:false,
            update:false,
 
        }
    }
    fetchData(){
        var url = 'http://13.58.103.107:5000/courses'
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
        
     var url ='http://13.58.103.107:5000/courses'
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
     Update(){
        
        var url ='http://13.58.103.107:5000/courses'
        fetch(url,{
            method:'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({id:this.state.id, name: this.state.name  })
        }).then(res => res.json())
             .then(json=> this.fetchData())
        }
    render(){
        return(
            <div>
                <BrowserRouter>
                {/*the form for displaying courses info*/}
                {this.state.courses.map(s=>
                    <div>
                        <div class="card" >
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_course_modal">Add Course</button>
                        </div>
                        </div>
                        <br/>
                        
                    </div>
               )}
                
                </BrowserRouter>
            </div>
        )
    }
}

