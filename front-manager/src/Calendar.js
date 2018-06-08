import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ListItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    marginTop: 100,
    color: theme.palette.text.secondary,
    height: 550
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button1: {
    display: 'flex',
    backgroundColor: '#31CFF2',
    '&:hover': {
      backgroundColor: '#175C6C',
    },
  },
  button2: {
    display: 'flex',
    backgroundColor: '#2BD28E',
    '&:hover': {
      backgroundColor: '#166746',
    },
  },
  button3: {
    display: 'flex',
    backgroundColor: '#47D858',
    '&:hover': {
      backgroundColor: '#226C2B',
    },
  }
})

class Calendar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Menu
            <List>
            <ListItem>
              <Button variant="contained" color="secondary" className={classes.button1}>
              Badminton 1
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" color="secondary" className={classes.button2}>
              Badminton 2
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" color="secondary" className={classes.button3}>
              Tennis
              </Button>
            </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Calendar</Paper>
        </Grid>
      </Grid>
      )
    }
}

Calendar.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Calendar)