import React from 'react'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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
      <div>
        <div>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={defaultDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </div>
        <div>
          <Grid container>
          </Grid>
        </div>
      </div>
    )
  }
}
ResultTransitory.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(ResultTransitory)
