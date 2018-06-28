import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logout from '../images/logout.png'
import NavBarGuest from './NavBar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: '#66FF33'
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  logout: {
    height: 'auto',
    width: 35,
    marginLeft: 8,
    paddingTop: 3
  }
}
class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }    
  }

  render () {
    const { classes } = this.props
    return (<div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#E6EAF0', boxShadow: 'none'}}>
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none', flex: 1 }}>
            <Typography variant="title" className={classes.flex} style={{ fontSize: '50px', fontFamily: 'ChampagneLimousines' }}>
            Alamo
            </Typography>
          </Link>
          <Button className={classes.btn}variant="raised" style={{backgroundColor: '#66FF33'}}>
            <Link to = {'/reservation/'} className={classes.link}>Mes réservations</Link>
          </Button>
          <a href ="#"><img src={logout} className={classes.logout} alt="logo" /></a>
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