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
    marginTop: 50,
    variant: 'raised'
  },
})

class ManagerLogin extends React.Component {
  state = {
    name: '',
    password: '',
    message: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(event.target.value)
  }

  handleLoginSubmit = () => {
    const data = {}
    fetch('/api/clubs/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert (data.error)
      } 
      else {
        this.setState({'message':'good'})
      } 
    })
    
    
    // if (this.state.name === exempleLogin.name && this.state.password === exempleLogin.password) {
    // this.props.history.push('/calendar')
    // }
    // else {
    //   alert('Wrong way !')
    // }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify={'center'}>
          <Grid item  xs={10} sm={6} md={4} >
            <Paper className={classes.paper}>  
              <FormControl className={classes.container} noValidate autoComplete="off">
                <h3>Alamo</h3>
                <TextField
                  name="name"
                  type="text"
                  label="Nom du club"
                  placeholder=" "
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Button className={classes.button} onClick={this.handleLoginSubmit}>
                  Login
                </Button>
                <p>{this.state.message}</p>
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
