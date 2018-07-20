import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const styles = theme => ({
  card: {
    marginRight: 10,
    marginBottom: 10,
    height: 300
  },
  paper: {
    height: 500,
    backgroundColor: 'none'
  },
  paperCalendar: {
    height: 270
  }
})

class CardResultDefault extends React.Component {
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
              <Grid item xs={6}>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.club.clubName}
                </Typography>
                <Typography component="p">
                  {this.props.club.address} <br />
                  {this.props.club.email} <br />
                  {this.props.club.phone} <br />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperCalendar}>Sports pratiqués : {this.props.club.sport}></Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}
CardResultDefault.propTypes = {
  classes: PropTypes.object,
  club: PropTypes.object
}
export default withStyles(styles)(CardResultDefault)
