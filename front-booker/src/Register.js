import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { withRouter } from 'react-router-dom'

const styles = {
  form: {
    padding: 10
  },
  margin: {
    width: '100%',
    marginBottom: 10
  },
  center: {
    textAlign: 'center'
  },
  message: {
    color: 'red'
  }
}


class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      familyName: '',
      firstName: '',
      pseudo: '',
      email: '',
      password: '',
      favSport: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  onSubmit = (e) => {
    e.preventDefault()
    // Submit to login URL
    const data = {}
    fetch('/api/users/register', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data  => {
      if (data.error) {
        this.setState({'message':data.error})
      }
      else {
        this.setState({'message':'good'})
      }       
    })
  }

  render () {
    const { classes } = this.props
    return (
      <form className={classes.form}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="nom">Nom</InputLabel>
          <Input
            className={classes.input}
            id="familyName"
            type="name"
            name="familyName"
            value={this.state.familyName}
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="prenom">Prénom</InputLabel>
          <Input
            className={classes.input}
            id="firstName"
            type="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="pseudo">Pseudo</InputLabel>
          <Input
            className={classes.input}
            id="pseudo"
            type="pseudo"
            name="pseudo"
            value={this.state.pseudo}
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="mail">Mail</InputLabel>
          <Input
            className={classes.input}
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            className={classes.input}
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <p className={classes.message}>{this.state.message}</p>
        </FormControl>
        {/* <FormControl className={classes.margin}>
          <InputLabel htmlFor="confirm password">confirm Password</InputLabel>
          <Input
            className={classes.input}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.onChange}
          /> */}
        {/* </FormControl> */}
        {/* <FormControl className={classes.margin}>
          <InputLabel html="favSport">Sport Favori</InputLabel>
          <Input
            className={classes.input}
            id="favSport"
            type="text"
            name="favSport"
            value={this.state.favSport}
            onChange={this.onChange}
          />
          
        </FormControl> */}
        <div className={classes.center}>
          <Button type="submit" onClick={this.onSubmit} style={{ backgroundColor: '#00ccff', variant: 'raised' }}>
            Sign in
          </Button>
        </div>
      </form>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func
}

export default withRouter(withStyles(styles)(Register))
