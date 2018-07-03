import React from 'react'
import SearchLocationBar from './components/SearchLocationBar'
import { withStyles } from '@material-ui/core/styles'
import IconeSport from './components/Icones'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import ResultTransitory from './ResultTransitory'
import Collapse from '@material-ui/core/Collapse'
import IconePresentation from './components/IconePresentation'
import NavBar from './components/NavBar'
import './index.css'

const styles = theme => ({
  paper: {
    backgroundColor: '#E6EAF0'
  }
})

const noEmpty = str => str && str !== ''

class Homepage extends React.Component {
  state = {
    city: null,
    markers : []
  }
  componentWillReceiveProps(nextProps) {
    const params = nextProps.match.params
    console.log(params)
  // // // }

  // componentDidMount() {
    // const params = this.props.match.params
    const hasSearchResults = noEmpty(params.sport) && noEmpty(params.city)
    if(!hasSearchResults) {
      return
    }
    console.log('fetch', params.city)
    fetch(`/api/cities/by-slug/${params.city}`)
    .then(res => res.json())
    .then(city => this.setState({
      city: city
    }))
  }
  render () {
    const { classes, match } = this.props
    const { params } = match
    const hasSearchResults = noEmpty(params.sport) && noEmpty(params.city)
    return (<div>
      <Paper className={classes.paper}>
        <NavBar />
        <SearchLocationBar history={this.props.history} hasSearchResults={hasSearchResults} />
          <Collapse in ={!hasSearchResults}>
            <IconeSport />
          </Collapse>
      </Paper>
        <Collapse in={!hasSearchResults}>
          <IconePresentation />
        </Collapse>
        <Collapse in={hasSearchResults}>
          <ResultTransitory city={this.state.city} />
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
