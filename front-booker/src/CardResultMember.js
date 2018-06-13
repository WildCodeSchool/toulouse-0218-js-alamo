import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

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
  }
})

class CardResultMember extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className={classes.verticalItems}>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.club.name}
                </Typography>
                <Typography component="p" className={classes.verticalFill}>
                  {this.props.club.adresse} : <br />
                  {this.props.club.email}: <br />
                  {this.props.club.phone}: <br />
                </Typography>
                <Button className={classes.button}>
                    Réserver
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperCalendar}>Calendar</Paper>
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
export default withStyles(styles)(CardResultMember)
