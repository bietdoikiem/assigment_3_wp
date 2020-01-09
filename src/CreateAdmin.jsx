import React from 'react'
import {Modal, Card, Button} from 'react-bootstrap';


export default class CreateAdmin extends React.Component{
    
    constructor(){
        super()
        this.state = {admins: [], 
            username: '', 
            password: '',
            modalIsOpen: false,
            isAuthenticated: 0,
            token: '',
        }
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this)
    }
    openModal(event){
        event.preventDefault();
        this.setState({modalIsOpen: true})
    }
    closeModal(event){
        event.preventDefault();
        this.setState({modalIsOpen: false})
    }
    handleChange(e){
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    create(event){
        event.preventDefault();
        var user ={username: this.state.username, password: this.state.password}
        fetch('http://13.59.166.121:5000/admins/',{
            method: 'POST',
            headers: {
                "Authorization" : `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.result === 'username taken'){
                alert("Username has been taken. Please choose a different one")
            }
            else{
                alert("Admin created successfully")
                window.location.reload()
            }
        })
    }
    fetchAdmins(){
        fetch('http://13.59.166.121:5000/admins/')
        .then(res=>res.json())
        .then(json=>this.setState({admins: json}))
    }
    componentDidMount(){
        this.fetchAdmins();
    }
    componentWillMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')}, () => console.log(this.state.isAuthenticated))
        this.setState({token: window.sessionStorage.getItem('token')})
    }

    render(){
        return(
            <div>
                <div class="row">
                    <div class="col-sm-6 col-md-12 mt-4">
                        <strong><h1 class="text-center login-title mt-4">Create an Adminstrator</h1></strong>
                        <div class="account-wall">
                            <img class="profile-img" src="https://icon2.cleanpng.com/20180816/jae/kisspng-computer-icons-login-user-system-administrator-ima-editing-mafsyah-template-5b75843a7b1045.0356392015344282185041.jpg"
                                alt="" />
                            <form class="form-signin">
                                <input type="text" name="username" class="form-control" placeholder="Enter new admin's username" onChange={this.handleChange.bind(this)}/>
                                <input type="password" name="password" class="form-control" placeholder="Enter password" onChange={this.handleChange.bind(this)}/>
                                <button class="btn btn-lg btn-primary btn-block" onClick={this.create.bind(this)}>
                                    Create admin</button>
                                <button class="btn btn-lg btn-danger btn-block" onClick={this.openModal}>
                                List of Admins</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Modal size="lg" show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><span style={{ color: "#007bff" }}>List of Adminstrators</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                            {this.state.admins.map(s=><li>{s.username}</li>)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}