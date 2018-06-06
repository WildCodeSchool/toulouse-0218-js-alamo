import React from 'react'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    marginTop: 100,
    color: theme.palette.text.secondary,
    height: 550
  },
})

class ManagerHome extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid item xs={4}>
          <Paper className={classes.paper}>login
          </Paper>
        </Grid>
      </div>
    )
  }
}

ManagerHome.propTypes = {
  classes : PropTypes.object
}

export default withStyles(styles)(ManagerHome)