import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 350
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

function ButtonAppBar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar >
          <Typography variant="title" color="#66FF33"  >
            Alamo
          </Typography>
          <List className={classes.flex} >
            <Button color="inherit">Mon club</Button>
            <Button color="inherit" >Membres</Button>
          </List>
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
          <Paper className={classes.paper}>Calendar</Paper>
      </Grid>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)