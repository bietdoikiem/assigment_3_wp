import React from 'react'
import { BrowserRouter, Link, withRouter} from 'react-router-dom'

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: 1
        }
    }
    componentWillMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')})
    }
    logout(event){
        event.preventDefault();
        window.sessionStorage.setItem("isAuthenticated", 0);
        this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
        window.location.reload()
    }
    render() {
        return (
            <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
                <div class="container">
                    <Link class="navbar-brand ml-1 mt-1" to="/">RMIT<img alt="RMIT_logo" src="https://i.imgur.com/g7I3sj6.png" style={{ height: "40px", width: "40px" }} className="ml-2"></img></Link>

                    <ul class="navbar-nav">
                        <li class="nav-item active ">
                            <Link class="nav-link" to="/home">Home </Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/projects">Projects</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/students">Students</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link " to="/courses">Courses</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link " to="/about">About</Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        {this.state.isAuthenticated == 1 &&
                        <>
                                <li class="nav-item active">
                                    <Link class="nav-link " to="/cadmin">Create Admin</Link>
                                </li>
                                <li class="nav-item active">
                                    <Link class="nav-link " to="#" onClick={this.logout.bind(this)}>Sign out</Link>
                                </li>
                        </>
                        } 
                        {this.state.isAuthenticated == 0 &&<li class="nav-item active ">
                            <Link class="nav-link " to="/login">Sign in</Link>
                        </li> }
                    </ul>
                </div>
            </nav >
        )
    }
}