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

const styles = () => ({
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
    marginBottom: 20,
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
    this.state = {}
  }
  render () {
    const { classes, timeSlots, reservations } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className={classes.verticalItems}>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.club.clubName}
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  {this.props.club.adresse} : <br />
                  {this.props.club.email}: <br />
                  {this.props.club.phone}: <br />
                </Typography>
                <Button className={classes.button}>
                  <Link to = {'/reservation/' + this.props.club.id} className={classes.link}>Réserver</Link>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <WeekCalendar reservations={reservations} timeSlots={timeSlots.filter(ts => ts.managerId === this.props.club.managerId)} />
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
