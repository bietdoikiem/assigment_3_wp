<div>
                        {/*Modal for adding courses*/}
                        <div class="modal fade" id="add_course_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                            <div div class="modal-dialog modal-dialog-centered"  >
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
                                        <Link to='/courses'><button type='button' className='btn btn-sm btn-outline-success' onClick={this.save.bind(this)}>Save</button></Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>