import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Divider } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Login from '../Login'
import Register from '../Register'

function getModalStyle () {
  const top = '15%'
  const left = '30%'
  const width = '40%'

  return {
    width: width,
    top: top,
    left: left
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class SimpleModal extends React.Component {
  state = {
    open: false,
    display: 'login'
  }
  handleClick= () => {
    let nextDisplay
    if (this.state.display === 'login') {
      nextDisplay = 'register'
    } else {
      nextDisplay = 'login'
    }

    this.setState({
      display: nextDisplay
    })
  }

  render () {
    const { classes } = this.props
    let text
    let linktext
    if (this.state.display === 'login') {
      text = 'Vous n\'avez pas de compte ?'
      linktext = 'Inscription'
    } else {
      text = 'Vous avez déjà un compte Alamo ?'
      linktext = 'Connexion'
    }

    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          open={this.props.open}
          onClose={this.props.close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            { this.state.display === 'login' ? <Login onClose={this.props.close}/> : <Register /> }
            <Divider />
            <div>
              {text} <a href='#' onClick={this.handleClick}>{linktext} </a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal)

export default SimpleModalWrapped
