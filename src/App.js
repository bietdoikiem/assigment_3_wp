import React from 'react';
import Navbar from './Navbar.jsx';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
