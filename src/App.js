import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx'
import Home from './Home.jsx';
import Projects from './Projects.jsx'
import './style.css';
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
