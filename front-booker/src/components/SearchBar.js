import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'

const styles = {
  margin: '0 auto',
  maxWidth: 800
}

function SimpleSearchBar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <SearchBar position="static" color="default">
        <SearchBar>
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
        </SearchBar>
      </SearchBar>
    </div>
  )
}

SimpleSearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SimpleSearchBar)
