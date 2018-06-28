import React from 'react'
import Navbar from './Navbar'
import Calendar from './Calendar'
import ManagerLogin from './ManagerLogin'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const withNavbar = Component => props => (
  <div>

    <Component {...props}/>
  </div>
)

class App extends React.Component {
  state={
    user: null
  }
  //définition du state user : soit objet soit null
  handleAuthChange = user => this.setState({
    user
  })
  //route d'échange avec serveur pour récupération session existante
  componentDidMount () {
    fetch("/api/clubs/status", {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        this.handleAuthChange(data.user)
      }
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => <ManagerLogin {...props} onLogin={this.handleAuthChange} />} />
            <Route path="/calendar" render={props => <Calendar {...props} user={this.state.user} /> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
  