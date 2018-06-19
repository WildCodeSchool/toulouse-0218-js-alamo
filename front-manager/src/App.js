import React from 'react'
import Navbar from './Navbar'
import Calendar from './Calendar'
import ManagerLogin from './ManagerLogin'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const withNavbar = Component => props => (
  <div>
    <Navbar />
    <Component {...props}/>
  </div>
)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleClick () {
    this.setState({ logged: {} })
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Layout exact path="/" component={ManagerLogin} user={this.state.user} />
            <Layout path="/calendar" render={withNavbar(Calendar)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

// const AuthExample = () => (
//   <Router>
//     <div>
//       <AuthButton />
//       <ul>
//         <li>
//           <Link to="/public">Public Page</Link>
//         </li>
//         <li>
//           <Link to="/protected">Protected Page</Link>
//         </li>
//       </ul>
//       <Route path="/public" component={Public} />
//       <Route path="/login" component={Login} />
//       <PrivateRoute path="/protected" component={Protected} />
//     </div>
//   </Router>
// );

  //   Fausse authentification 
  //   const fakeAuth = {
  //   isAuthenticated: false,
  //   authenticate(cb) {
  //     this.isAuthenticated = true;
  //     setTimeout(cb, 100); // fake async
  //   },
  //   signout(cb) {
  //     this.isAuthenticated = false;
  //     setTimeout(cb, 100);
  //   }
  // };

  // Affichage boutton log out
  // Récupération de l'url d'origine pour boutton logout
  // Plus détection si logué ou non pour affichage du boutton
  // const AuthButton = withRouter(
  //   ({ history }) =>
  //     fakeAuth.isAuthenticated ? (
  //       <p>
  //         Welcome!{" "}
  //         <button
  //           onClick={() => {
  //             fakeAuth.signout(() => history.push("/"));
  //           }}
  //         >
  //           Sign out
  //         </button>
  //       </p>
  //     ) : (
  //       <p>You are not logged in.</p>
  //     )
  // );
  
  // Filtre PrivateRoute : oriente vers le composant si logué, sinon oriente vers page de login
  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       fakeAuth.isAuthenticated ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             state: { from: props.location }
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
  
  // Contenu à afficher:
  // const Public = () => <h3>Public</h3>;
  // const Protected = () => <h3>Protected</h3>;
  
  // 
  // class Login extends React.Component {
  //   state = {
  //     redirectToReferrer: false
  //   };
  
  //   login = () => {
  //     fakeAuth.authenticate(() => {
  //       this.setState({ redirectToReferrer: true });
  //     });
  //   };
  
  //   render() {
  //     const { from } = this.props.location.state || { from: { pathname: "/" } };
  //     const { redirectToReferrer } = this.state;
  
  //     if (redirectToReferrer) {
  //       return <Redirect to={from} />;
  //     }
  
  //     return (
  //       <div>
  //         <p>You must log in to view the page at {from.pathname}</p>
  //         <button onClick={this.login}>Log in</button>
  //       </div>
  //     );
  //   }
  // }
  
  