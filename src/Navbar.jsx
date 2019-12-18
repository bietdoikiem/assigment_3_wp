import React from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Student App</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to ="/">Home</Link></li>
                            <li><Link to = "/students">Student Projects</Link></li>
                            <li><Link to ="/courses">Courses</Link></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </div>
                </nav>
                </BrowserRouter>
            </div>
        )
    }
}