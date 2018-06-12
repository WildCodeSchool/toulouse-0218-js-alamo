import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import permIdentity from '../images/permIdentity.png'
import Button from '@material-ui/core/Button'
import '../index.css'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: '#66FF33'
  }
}

class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (<div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#E6EAF0', boxShadow: 'none'}}>
        <Toolbar>
          <Typography variant="title" className={classes.flex} style={{ fontSize: '50px', fontFamily: 'ChampagneLimousines' }}>
          Alamo
          </Typography>
          <Button className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33'}}>
        Vous êtes gérant de salle de sport ?
          </Button> <a href ="#" ><img src={permIdentity} className="App-logo" alt="logo" /> </a>
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
