import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/Lock'

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
  }
}

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nom: '',
      prenom: '',
      pseudo: '',
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit (e) {
    console.log('submit register', e)
    e.preventDefault()
    // Submit to login URL
    fetch('/path/to/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(() => {
      })
  }
  render () {
    const { classes } = this.props
    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="nom">Nom</InputLabel>
          <Input
            className={classes.input}
            id="nom"
            type="nom"
            name="nom"
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="prenom">Prénom</InputLabel>
          <Input
            className={classes.input}
            id="prenom"
            type="prenom"
            name="prenom"
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="pseudo">Pseudo</InputLabel>
          <Input
            className={classes.input}
            id="speudo"
            type="pseudo"
            name="pseudo"
            onChange={this.onChange}
          />
        </FormControl>

        <FormControl className={classes.margin}>
          <InputLabel htmlFor="mail">Mail</InputLabel>
          <Input
            className={classes.input}
            id="mail"
            type="mail"
            name="mail"
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
            onChange={this.onChange}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="confirm password">confirm Password</InputLabel>
          <Input
            className={classes.input}
            id="confirm password"
            type="confirm password"
            name="confirm password"
            onChange={this.onChange}
          />
        </FormControl>
        <div className={classes.center}>
          <Button type="submit" style={{ backgroundColor: '#66ff33', variant: 'raised' }}>
            Sign in
          </Button>
        </div>
      </form>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Register)
