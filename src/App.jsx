import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx'
import Home from './Home.jsx';
import Projects from './Projects.jsx'
import Courses from './Courses.jsx'
import AddCourses from './Add_courses.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import ProjectSearch from './ProjectSearch.jsx';
import Login from './Login.jsx';
import Students from './Students.jsx'

import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";



export default class App extends React.Component {
  constructor(){
    super()
    this.state = {isAuthenticated: 0}
  }

  componentWillMount(){
    if (window.sessionStorage.getItem("isAuthenticated") === null) {
      window.sessionStorage.setItem('isAuthenticated', 0)
    }
    this.setState({isAuthenticated: window.sessionStorage.getItem('isAuthenticated')})
  }
  render(){
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div id="page-container">
          <div id="content-wrap">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/home" component={Home}/>
            </Switch>
            <div className="container">  
              <Switch>
                <Route exact path="/projects" component={Projects}/>
                <Route path="/projects/:id" component={ProjectDetail} />
                <Route exact path="/search" component={ProjectSearch}/>
                <Route path="/courses" component={Courses}/>
                <Route path="/Add_courses" component={AddCourses}/>
                <Route path="/login" component={Login}/>
                <Route path="/students" component={Students}/>
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
  }
}
