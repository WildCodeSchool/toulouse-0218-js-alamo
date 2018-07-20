import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logout from '../images/logout.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signedOut } from '../actions'

const styles = {
  root: {
    flexGrow: ''
  },
  flex: {
    flex: 1,
    color: '#00ccff',
    textShadow: '1px 1px 1px #000'
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
class NavBarConnected extends React.Component {
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
            <Typography variant="title" className={classes.flex} style={{ fontSize: '50px', fontFamily: 'cabin' }}>
            Alamo
            </Typography>
          </Link>
          <Button className={classes.btn}variant="raised" style={{backgroundColor: '#00ccff'}}>
            <Link to = {'/reservation/'} className={classes.link}>Mes réservations</Link>
          </Button>
          <a href ="#" onClick={this.props.signedOut}><img src={logout} className={classes.logout} alt="logo" /></a>
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

NavBarConnected.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    signedOut: () => dispatch(signedOut())
  }
}
export default connect(null, mapDispatchToProps)(withStyles(styles)(NavBarConnected))
