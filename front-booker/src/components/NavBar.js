import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import permIdentity from '../images/permIdentity.png'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Modal from '../modal/modal'
import { Link } from 'react-router-dom'

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
    this.state = {
      modalOpen: false
    }

    this.handleOpen= this.handleOpen.bind(this)
    this.handleClose= this.handleClose.bind(this)

  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render () {
    const { classes } = this.props
    const { modalOpen}= this.state
    return (<div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#E6EAF0', boxShadow: 'none'}}>
        <Toolbar>
          <Link to="/" style={{textDecoration: 'none', flex: 1}}>
            <Typography variant="title" className={classes.flex} style={{ fontSize: '50px', fontFamily: 'ChampagneLimousines' }}>
              Alamo
            </Typography>
          </Link>
          <Hidden xsDown smDown>
            <Button className={classes.btn}variant="raised" style={{backgroundColor: '#66FF33'}}>
        Vous êtes gérant de salle de sport ?
            </Button>
          </Hidden>
          <Hidden lgUp mdUp>
            <Button className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33'}}>
        gérant ?
            </Button>
          </Hidden>
          <a href ="#" onClick={this.handleOpen}>< img src={permIdentity} className="App-logo" alt="logo" /> </a>

        </Toolbar>
      </AppBar>

      < Modal open={modalOpen} close={this.handleClose} />
    </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
