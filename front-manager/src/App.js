import React from 'react'
import Navbar from './Navbar'
import Calendar from './Calendar'
import ManagerLogin from './ManagerLogin'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

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
  handleAuthChange = user => this.setState({ user })
  
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
  // componentDidUpdate (user) {
  //   if (user === null){
  //     fetch("/api/clubs/status", {
  //       credentials: 'include'
  //     })
  //   }
  // }
  render() {
    return (
      <Router basename="/manager">
        <div>
          <Switch>
            <Route exact path="/" render={props => 
              this.state.user === null ? 
              <ManagerLogin {...props} onLogin={this.handleAuthChange} /> :
              <Redirect to={{ pathname: `/calendar/${this.state.user.id}`}}  {...props} /> } 
            />
            <Route path="/calendar" render={props => <Calendar {...props} user={this.state.user} onLogout={this.handleAuthChange}/> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

