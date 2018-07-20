import React from 'react'
import SearchLocationBar from './components/SearchLocationBar'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import ResultTransitory from './ResultTransitory'
import Collapse from '@material-ui/core/Collapse'
import IconePresentation from './components/IconePresentation'
import NavBar from './components/NavBar'
import './index.css'

const styles = theme => ({
  paper: {

  }
})

const noEmpty = str => str && str !== ''

class Homepage extends React.Component {
  state = {
    city: null,
    markers : [],
    timeSlots: [],
    reservations: []
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('willReceiveProps', nextProps)
    const params = nextProps.match.params
    const hasSearchResults = noEmpty(params.sport) && noEmpty(params.city)
    if(!hasSearchResults) {
      return
    }
    this.fetchMarkers(params)
    // fetch(`/api/cities/by-slug/${params.city}`)
    // .then(res => res.json())
    // .then(city => this.setState({
    //   city: city
    // }))
  }
  componentDidMount() {
    const params = this.props.match.params
    const hasSearchResults = noEmpty(params.sport) && noEmpty(params.city)
    if(!hasSearchResults) {
      return
    }
    this.fetchMarkers(params)
  }
  fetchMarkers (params) {
    fetch(`/api/cities/${params.city}/sport-match/${params.sport}`)
      .then(res => res.json())
      .then(data => this.setState({
        markers: data.markers,
        city: data.city,
        timeSlots: data.timeSlots,
        reservations: data.reservations
      }))
  }
  render () {
    const { classes, match } = this.props
    const { city, markers, timeSlots, reservations } = this.state
    const { params } = match
    const hasSearchResults = noEmpty(params.sport) && noEmpty(params.city)
    return (<div>
      <div >
        <NavBar />
        <SearchLocationBar match={this.props.match} history={this.props.history} hasSearchResults={hasSearchResults} />
      </div>
      <Collapse in={!hasSearchResults}>
        <IconePresentation />
      </Collapse>
      <Collapse in={hasSearchResults}>
        <ResultTransitory city={city} clubs={markers} timeSlots={timeSlots} reservations={reservations} />
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
