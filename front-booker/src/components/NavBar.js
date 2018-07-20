import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavBarGuest from './NavBarGuest'
import NavBarConnected from './NavBarConnected'

class NavBar extends React.Component {
  render () {
    const { user } = this.props
    return (
      this.props.user ? <NavBarConnected user={user} /> : <NavBarGuest />
    )
  }
}

NavBar.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({ 
  user: state.user.user
})

export default connect(mapStateToProps)(NavBar)
