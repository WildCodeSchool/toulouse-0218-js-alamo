import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

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
  render () {
    const { classes, club } = this.props
    return (
      <div className={classes.result}>
        <Grid container justify='center'>
          <Typography component="h1" className={classes.titre}>
          Veuillez confirmer votre réservation
          </Typography>
        </Grid>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className={classes.verticalItems}>
                <Typography gutterBottom variant="headline" component="h2">
                  {club.clubName}
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  {club.address}, {club.city}<br />
                  E-mail: {club.email} <br />
                  {/* {club.phone} <br /> */}
                </Typography>
                <Button className={classes.button}>
                  <Link to = {'/reservation/' + club.id} className={classes.link}>Confirmer</Link>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperCalendar}>Récap réservation</Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(CardReservation)
