import React from 'react'
import {Button} from 'react-bootstrap';


export default class Login extends React.Component{
    
    constructor(){
        super()
        this.state = {username: '', password: ''}
    }

    handleChange(e){
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    login(event){
        event.preventDefault();
        var user ={username: this.state.username, password: this.state.password}
        fetch('http://localhost:5000/admins/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.result === 'authenticated'){
                alert('Login successfully')
                window.sessionStorage.setItem('isAuthenticated', 1)
                this.props.history.push('/projects')
                window.location.reload()
            }else{
                alert('Wrong username or password')
                window.sessionStorage.setItem('isAuthenticated', 0)
                window.location.reload()
            }
        })
    }

    render(){
        return(
            <div>
                <div class="row">
                    <div class="col-sm-6 col-md-12 mt-4">
                        <strong><h1 class="text-center login-title mt-4">Sign in as Adminstrator</h1></strong>
                        <div class="account-wall">
                            <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form class="form-signin">
                                <input type="text" name="username" class="form-control" placeholder="Username" onChange={this.handleChange.bind(this)}/>
                                <input type="password" name="password" class="form-control" placeholder="Password" onChange={this.handleChange.bind(this)}/>
                                <button class="btn btn-lg btn-primary btn-block" onClick={this.login.bind(this)}>
                                    Sign in</button>
                                <a href="#" class="pull-right need-help">Need help? </a><span class="clearfix"></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}