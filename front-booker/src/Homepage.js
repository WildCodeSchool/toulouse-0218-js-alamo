import React from 'react'
import SimpleAppBar from './components/NavBar'
import SimpleSearchBar from './components/SearchBar'
import { withStyles } from '@material-ui/core/styles'
import IconeSport from './components/Icones'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import './index.css'

const styles = theme => ({
  paper: {
    backgroundColor: '#E6EAF0'
  }
})
class Homepage extends React.Component {

  render () {
    const { classes } = this.props
    return (<div>
      <Paper className={classes.paper}>
        < SimpleAppBar />
        < SimpleSearchBar />
        < IconeSport />
      </Paper>
    </div>
    )
  }
}
Homepage.propTypes = {
  classes: PropTypes.object
}
export default withStyles(styles)(Homepage)
