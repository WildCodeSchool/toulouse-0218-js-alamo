import React from 'react'
import Navbar from './Navbar'
import ManagerLogin from './ManagerLogin'
import Calendar from './Calendar'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"


class ManagerRouter extends React.Component {
  render() {
    return (
      <div>
        <Router>
            <Route exact path="/" render={ManagerLogin} />
            <Route path="/calendar" render={Calendar} />
        </Router>
      </div>
    );
  }
}

export default withRouter(ManagerRouter)
