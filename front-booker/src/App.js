import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (<Fragment>
        <div className="App">
          <Homepage />
        </div>
      </Fragment>
    )
  }
}

export default App
