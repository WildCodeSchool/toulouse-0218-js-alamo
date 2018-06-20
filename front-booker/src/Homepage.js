import React from 'react'
import NavBar from './components/NavBar'
import SearchLocationBar from './components/SearchLocationBar'
import { withStyles } from '@material-ui/core/styles'
import IconeSport from './components/Icones'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconePresentation from './components/IconePresentation'
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
        <NavBar />
        <SearchLocationBar nextStep={this.props.nextStep}/>
        <IconeSport />
      </Paper>
      <IconePresentation />
    </div>
    )
  }
}
Homepage.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(Homepage)
