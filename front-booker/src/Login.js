import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/Lock'
import { connect } from 'react-redux'
import { signedIn } from './actions'

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

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pseudo: '',
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
    e.preventDefault()
    // Submit to login URL
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({'message':data.error})
        }
        else {
          this.setState({'message':'logged'})
          this.props.onClose()
          return data
        }
      })
      .then(user => {
          this.props.signedIn(user)
          console.log('retour de objet user', user)
      })
  }
  render () {
    const { classes } = this.props
    return (
      <form className={classes.form}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="pseudo">Pseudo</InputLabel>
          <Input
            className={classes.input}
            id="pseudo"
            type="pseudo"
            name="pseudo"
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
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
          <p className={classes.message}>{this.state.message}</p>
        </FormControl>
        <div className={classes.center}>
          <Button type="submit" onClick={this.onSubmit} style={{ backgroundColor: '#66ff33', variant: 'raised' }}>
            Login
          </Button>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object
}
const mapDispatchToProps = dispatch => {
  return {
    signedIn: (user) => dispatch(signedIn(user))
  }
}
export default connect(null, mapDispatchToProps)(withStyles(styles)(Login))
