import React from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    marginTop: 100,
    color: theme.palette.text.secondary,
    height: 350,
    textAlign: 'center',
  },
  textField: {
    margin: theme.spacing.unit * 2,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
    variant: 'raised'
  },
  message: {
    color: 'red'
  }
})

class ManagerLogin extends React.Component {
  state = {
    email: '',
    password: '',
    message: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(event.target.value)
  }

  onEnter = e => {
    if (e.keyCode !== 13) {
      return
    }
    this.handleLoginSubmit()
  }

  handleLoginSubmit = () => {
    fetch('/api/clubs/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include',
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        this.setState({'message':data.error})
      } 
      else {
        let id = data.id
        this.setState({'message':''})
        this.props.onLogin(data)
        this.props.history.push(`/calendar/${id}`)
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify={'center'}>
          <Grid item  xs={10} sm={6} md={4} >
            <Paper className={classes.paper}>  
              <FormControl 
                className={classes.container} 
                noValidate autoComplete="off" 
              >
                <h3>Alamo</h3>
                <TextField
                  name="email"
                  type="text"
                  label="Email du club"
                  placeholder=" "
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  onKeyDown={this.onEnter}
                />
                <p className={classes.message}>{this.state.message}</p>
                <Button 
                  className={classes.button} 
                  onClick={this.handleLoginSubmit}
                >
                  Login
                </Button>
              </FormControl> 
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ManagerLogin.propTypes = {
  classes : PropTypes.object
}

export default withRouter(withStyles(styles)(ManagerLogin));
