import React from 'react'
import NavBar from './components/NavBar'
import SearchLocationBar from './components/SearchLocationBar'
import { withStyles } from '@material-ui/core/styles'
import IconeSport from './components/Icones'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconePresentation from './components/IconePresentation'
import Collapse from '@material-ui/core/Collapse'
import ResultTransitory from './ResultTransitory'
import './index.css'

const styles = theme => ({
  paper: {
    backgroundColor: '#E6EAF0'
  }
})

const notEmpty = str => str && str !== ''

class Homepage extends React.Component {
  render () {
    const { classes, match } = this.props
    const { params } = match
    const hasSearchResults = notEmpty(params.sport) && notEmpty(params.city)
    return (<div>
      <Paper className={classes.paper}>
        <NavBar />
        <SearchLocationBar history={this.props.history} hasSearchResults={hasSearchResults} nextStep={this.props.nextStep}/>
        <Collapse in={!hasSearchResults}>
          <IconeSport />
        </Collapse>
      </Paper>
      <Collapse in={!hasSearchResults}>
        <IconePresentation />
      </Collapse>
      <Collapse in={hasSearchResults}>
        <ResultTransitory />
      </Collapse>
    </div>
    )
  }
}
Homepage.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(Homepage)
