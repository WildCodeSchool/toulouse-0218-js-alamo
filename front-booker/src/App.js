import React, { Component } from 'react'
import Homepage from './Homepage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reservation from './Reservation'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/s/:sport/:city' component={Homepage} />
            <Route exact path='/reservation/:clubId/:slotId/:date' component={Reservation} />
            <Route exact path='/historique/:id' component={Reservation} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
