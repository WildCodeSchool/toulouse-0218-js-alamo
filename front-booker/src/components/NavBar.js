import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import permIdentity from '../images/permIdentity.png'
import Button from '@material-ui/core/Button'
import Modal from '../modal/modal'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: '#66FF33'
  }
}

class SimpleAppBar extends React.Component {
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
          <Typography variant="title" className={classes.flex} >
          Alamo
          </Typography>
          <Button className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33'}}>
        Vous êtes gérant de salle de sport ?
          </Button> <a href ="#"  onClick={this.handleOpen}><img src={permIdentity} className="App-logo" alt="logo" /> </a>
        </Toolbar>
      </AppBar>

      < Modal open={modalOpen} close={this.handleClose} />
    </div>
    )
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleAppBar)
