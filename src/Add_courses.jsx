import React from 'react'
import { Link} from 'react-router-dom'
 
export default class AddCourses extends React.Component{
 
   constructor(props){
       super(props)
       this.state = {
           courses: [],
           id: '',
           name: '',

       }
   }
   fetchData(){
       var url = 'http://13.58.103.107:5000/courses'
       fetch(url)
           .then(res=>res.json())
           .then(json=>this.setState({courses: json}))
   }
   handleChange(e){
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
   render(){
       return(
       <div>
           <form>
               <div className='container'>
                   <div className = 'jumbotron'>
                   <h1>Add new courses</h1>
                   <div class = 'form-group'>
                <label>Courses Name</label>
                <br/>
                 <input input type="text" name="name" value={this.state.name}
                   onChange={this.handleChange.bind(this)}
                ></input>
                </div>
                <br/>
                <div class = 'form-group'>
                <label>Courses Code</label>
                <br/>
                <input input type="text" name="id" value={this.state.id}
                   onChange={this.handleChange.bind(this)}
                ></input>
                </div>
                <br/>
                <br/>
                <Link to='/courses'><button type='button' className='btn btn-sm btn-outline-success' onClick={this.save.bind(this)}>Save</button></Link>
                   </div>
               </div>
           </form>   
       </div>
       )
   }    
}