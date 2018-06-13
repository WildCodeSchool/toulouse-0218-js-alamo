import React from 'react'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom'
import { withRouter } from 'react-router'


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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 50
  },
})

class ManagerLogin extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify={'center'}>
          <Grid item xs={4} >
            <Paper className={classes.paper}>  
              <FormControl className={classes.container} noValidate autoComplete="off">
                <h3>Login</h3>
                <TextField
                  id="name"
                  label="Nom du club"
                  className={classes.textField}
                  placeholder=" "
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
                <Button color="primary" className={classes.button}>Login
                  {/* <Link to = "/calendar"></Link> */}
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