import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import permIdentity from '../images/permIdentity.png'
import Modal from '../modal/modal'
import ModalManager from '../modal/modalManager'
import { Link } from 'react-router-dom'


const styles = {
  root: {
    flexGrow: ''
  },
  flex: {
    flex: 1,
    color: '#00ccff',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'
  }
  
}

class NavBarGuest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }

    this.handleOpen= this.handleOpen.bind(this)
    this.handleClose= this.handleClose.bind(this)

  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render () {
    const { classes } = this.props
    const { modalOpen } = this.state
    return (<div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#ffff', boxShadow: 'none'}}>
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none', flex: 1 }}>
            <Typography variant="title" className={classes.flex} style={{ fontSize: '100px', fontFamily: 'cabin'
            }}>
            Alamo
            </Typography>
          </Link>
          < ModalManager />
          <a href ="#" onClick={this.handleOpen}>< img src={permIdentity} className="App-logo" alt="logo" /> </a>
        </Toolbar>
      </AppBar>

      <Modal open={modalOpen} close={this.handleClose} />
    </div>
    )
  }
}

NavBarGuest.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBarGuest)
