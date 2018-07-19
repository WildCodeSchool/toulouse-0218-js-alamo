import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import formatMonth from './components/WeekCalendar/helpers/formatMonth'
import formatHour from './components/WeekCalendar/helpers/formatHour'

const styles = theme => ({
  card: {
    height: 300
  },
  paper: {
    height: 500,
    backgroundColor: '#E6EAF0'
  },
  paperCalendar: {
    height: 270
  },
  verticalItems: {
    display: 'flex',
    flexDirection: 'column'
  },
  verticalFill: {
    flexGrow: 1
  },
  button: {
    backgroundColor: '#66FF33',
    marginRight: 20,
    color: 'white'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  titre: {
    fontSize: 35,
    padding: 15
  }
})

class CardReservation extends React.Component {
  sendBookingRequest = e => {
    const { slotId, date } = this.props
    fetch(`/api/bookings/${slotId}/${date}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if(response.error) {
          alert(`ERROR: ${response.error}`)
        }
        else {
          alert('Votre réservation a bien été enregistrée')
        }
      })
  }
  render () {
    const { classes, data } = this.props
    const date = new Date(this.props.date)
    const dayOfMonth = date.getDate()
    const month = formatMonth(date.getMonth())
    const year = 1900 + date.getYear()
    const formattedDate = `${dayOfMonth} ${month} ${year}`
    const startHour = formatHour(data.startHour)
    const endHour = formatHour(data.endHour)
    return (
      <div className={classes.result}>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Typography component="h1" className={classes.titre}>
            Veuillez confirmer votre réservation
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Grid item xs={8} className={classes.verticalItems}>
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {data.clubName}
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  <strong>Adresse</strong>: {data.address}, {data.city}<br />
                  <strong>E-mail</strong>: {data.email} <br /> <br />
                  {/* {data.phone} <br /> */}
                </Typography>
                <Typography gutterBottom variant="headline" component="h3">
                Réservation
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  <strong>Sport</strong>: {data.sport} <br />
                  <strong>Lieu</strong>: {data.resource} <br />
                  <strong>Date</strong>: {formattedDate} de {startHour} &agrave; {endHour} <br />
                </Typography>
                <Button className={classes.button} onClick={this.sendBookingRequest}>
                  Confirmer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(CardReservation)
