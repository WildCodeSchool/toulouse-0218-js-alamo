import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Calendar from './Calendar'
import { Redirect,  withRouter } from 'react-router-dom'


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

const exempleLogin = {
  name:'test',
  password: 'pass'
}

class ManagerLogin extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(event.target.value)
  }

  handleLoginSubmit = () => {
    console.log(this.state)
    if (this.state.name === exempleLogin.name && this.state.password === exempleLogin.password) {
    this.props.history.push('/calendar')
    }
    else {
      alert('Wrong way !')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify={'center'}>
          <Grid item xs={4} >
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
