import React, { Component } from 'react';
import Navbar from './Navbar.js'
import ManagerHome from './ManagerHome'
import Calendar from './Calendar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ManagerHome />
      </div>
    );
  }
}

export default App;
