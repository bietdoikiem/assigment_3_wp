import React from 'react'

export default class Add_co extends React.Component{
    Close= (e) => {this.props.addnew=false;} ;
    render(){
        if(!this.props.addnew){
           return null;
        }
        return(
            <div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                    <div div class="modal-dialog modal-dialog-centered"  >
                        <div class="modal-content">
                            <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLongTitle">Add course</h3>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="Idinput">Type code of your courses</label>
                                    <input input type="text" class="form-control" id="Idinput" aria-describedby="IdHelp" placeholder="Enter email" value={this.props.course_id}
                                    onChange={this.props.changeCode} />    
                                    <small class="form-text text-muted">You should double check for not overloop other courses code</small>
                                </div>
                                <div class="form-group">
                                    <label for="Coursename">Courses name</label>
                                    <input type="Text" class="form-control" id="Coursename" placeholder="Type your coursename" 
                                    value={this.props.course_name} 
                                    onChange={this.props.changeCourse} />
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary" onClick={this.props.Close} >Close</button>
                                <button type="submit" class="btn btn-primary" onClick={this.props.AddCo} >Add course</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

