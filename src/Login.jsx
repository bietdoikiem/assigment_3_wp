import React from 'react'

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
    login(){
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
            if(data.result == 'authenticated'){
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
                Username: <input type="text" id="username" name="username" value={this.state.username}
                onChange={this.handleChange.bind(this)}/><br/>

                Password: <input type="password" id="password" name="password" value={this.state.password}
                onChange={this.handleChange.bind(this)}/><br/>

                <button onClick={this.login.bind(this)}>Login</button>
            </div>
        )
    }
}