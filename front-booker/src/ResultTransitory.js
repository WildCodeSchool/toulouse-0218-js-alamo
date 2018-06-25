import React from 'react'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import CardResultDefault from './CardResultDefault'
import CardResultMember from './CardResultMember'
import AlamoMap from './AlamoMap'
import clubs from './clubs'

const styles = theme => ({
  formDate: {
    display: 'flex',
    flexWrap: 'wrap'    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginBottom: theme.spacing.unit * 2
  },
  paper: {
    backgroundColor: '#E6EAF0',
    padding: theme.spacing.unit * 2
  }
})



class ResultTransitory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { classes } = this.props
    const date = new Date()
    const defaultDate = date.toISOString().substr(0, 10)
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <form className={classes.formDate} noValidate>
            <Grid container justify='center'>
              <TextField
                id="date"
                type="date"
                defaultValue={defaultDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={5}>
            <div>
              {
                clubs.map((club, k) => {
                  return club.member ? <CardResultMember club={club} key={k} /> : <CardResultDefault club={club} key={k} />
                })
              }
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <div>
              <AlamoMap />
            </div>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
ResultTransitory.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(ResultTransitory)
