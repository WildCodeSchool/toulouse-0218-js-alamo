import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import MyCalendar from '../src/components/MyCalendar'
import WeekCalendar from './components/WeekCalendar'
import classNames from 'classnames'

const styles = () => ({
  card: {
    // height: 300
  },
  paper: {
    height: 500,
    backgroundColor: '#E6EAF0'
  },
  paperCalendar: {
    // height: 270
  },
  verticalItems: {
    display: 'flex',
    flexDirection: 'column'
  },
  verticalFill: {
    flexGrow: 1
  },
  button: {
    marginRight: 20,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#AAA',
    color: '#333'
  },
  enabledButton: {
    backgroundColor: '#66FF33',
    color: 'white'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
})

class CardResultMember extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTimeSlot: null,
      canBook: false,
      date: null
    }
  }
  onClickSlot = (timeSlot, date, isBookable, isBooked) => {
    this.setState({
      selectedTimeSlot: timeSlot,
      canBook: isBookable && ! isBooked,
      date
    })
  }
  render () {
    const { classes, timeSlots, club, reservations, history } = this.props
    const { selectedTimeSlot, canBook } = this.state
    // Si on a sélectionné un créneau, on prend la date dans le state,
    // sinon on met la date du jour
    const date = this.state.date ? this.state.date : new Date()
    // On formate sa date en YYYY-MM-DD
    const formattedDate = date.toISOString().substr(0, 10)
    const buttonClass = canBook ? classes.enabledButton : classes.disabledButton
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className={classes.verticalItems}>
                <Typography gutterBottom variant="headline" component="h2">
                  {club.clubName}
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  {club.address} <br />
                  {club.email} <br />
                  {club.phone} <br />
                </Typography>
                <Button
                  className={classNames(classes.button, buttonClass)}
                  disabled={! canBook}
                  onClick={ () => history.push(`/reservation/${club.id}/${selectedTimeSlot.id}/${formattedDate}`) }>
                  Réserver
                </Button>
              </Grid>
              <Grid item xs={6}>
                <WeekCalendar
                  onClickSlot={this.onClickSlot}
                  reservations={reservations}
                  timeSlots={timeSlots.filter(ts => ts.managerId === club.id)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}
CardResultMember.propTypes = {
  classes: PropTypes.object,
  club: PropTypes.object
}
export default withRouter(withStyles(styles)(CardResultMember))
