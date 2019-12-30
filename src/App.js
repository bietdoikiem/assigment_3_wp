import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx'
import Home from './Home.jsx';
import Projects from './Projects.jsx'
import Courses from './Courses.jsx'
import AddCourses from './Add_courses'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'



function App() {
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
                <Route path="/projects" component={Projects}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/courses" component={Courses}/>
                <Route path="/Add_courses" component={AddCourses}/>
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
