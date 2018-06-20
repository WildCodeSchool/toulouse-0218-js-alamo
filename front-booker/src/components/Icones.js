import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import sport from '../images/sport.png'

const styles = {
  root: {
    marginTop: '80px'
  }
}

class Icones extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Grid container item spacing={0} justify="center" >
            <Grid item xs={9} style={{width: '90%'}}>
              <img src={sport} className="sport" alt="sport" style={{width: '100%', paddingTop: '5vh'}} />
            </Grid>
          </Grid>
        </Grid>
      </div>

    )
  }
}

Icones.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Icones)
