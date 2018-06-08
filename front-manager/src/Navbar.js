import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';



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
            <Button color="inherit">Mes salles</Button>
            <Button color="inherit" >Membres</Button>
          </List>
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)