import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import Footer from './Footer'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (<Fragment>
        <div className="App">
          <Homepage />
          <Footer />
        </div>
      </Fragment>
    )
  }
}

export default App
