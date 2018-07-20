import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CardReservation from './CardReservation'
import NavBar from './components/NavBar'

const styles = theme => ({
  paper: {
    backgroundColor: 'none',
    height: 500
  }
})

class Reservation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      available: false
    }
  }

  componentDidMount () {
    const { match } = this.props
    const { clubId, slotId, date } = match.params
    fetch(`/api/bookings/${clubId}/${slotId}/${date}`)
      .then(res => res.json())
      .then(response => this.setState({
        data: response.data,
        available: response.available
      }))
  }
  render () {
    const { classes, match } = this.props
    const { date, slotId } = match.params
    const { data, available } = this.state
    return (
      <Paper className={classes.paper}>
        <NavBar />
        <Grid container item spacing={0} justify="center">
          <Grid item xs={12} md={5}>
            {data && available && <CardReservation className={classes.item} data={data} date={date} slotId={slotId} />}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(Reservation)
