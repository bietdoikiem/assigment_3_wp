import React from 'react'
import { BrowserRouter, Link, withRouter} from 'react-router-dom'

export default class Navbar extends React.Component {
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
                        <li class="nav-item ">
                            <Link class="nav-link " to="/about">Sign in</Link>
                        </li>
                        <li class="nav-item ">
                            <Link class="nav-link " to="/about">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </nav >
        )
    }
}