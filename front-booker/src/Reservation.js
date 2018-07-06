import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CardReservation from './CardReservation'
import NavBar from './components/NavBar'

const styles = theme => ({
  paper: {
    backgroundColor: '#E6EAF0',
    height: 500
  }
})

class Reservation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      club: null
    }
  }

  componentDidMount () {
    const { match } = this.props
    fetch(`/api/clubs/${match.params.clubId}`)
      .then(res => res.json())
      .then(club => this.setState({ club }))
  }
  render () {
    const { classes, match } = this.props
    const id = Number(match.params.id)
    // const club = clubs.find(club => club.id === id)
    const { club } = this.state
    return (
      <Paper className={classes.paper}>
        <NavBar />
        <Grid container item spacing={0} justify="center">
          <Grid item xs={12} md={5}>
            {club && <CardReservation className={classes.item} club={club} />}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(Reservation)
