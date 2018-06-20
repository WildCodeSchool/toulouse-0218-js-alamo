import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }
  
  render () {
   return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/s/:sport/:city' component={Homepage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
