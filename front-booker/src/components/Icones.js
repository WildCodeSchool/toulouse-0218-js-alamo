import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import icone4 from '../images/icone4.png'
import icone5 from '../images/icone5.png'
import icone6 from '../images/icone6.png'

const styles = {
  root: {
    flexGrow: 1
  }
}

class IconeSport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={10}
            className={classes.demo}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
            style={{height: '20vh'}}
          >
            <Grid item xs={4}>
              <img src={icone6} className="icone" alt="icone" style={{width: '33%', paddingLeft: '50%', paddingBottom: '30%'}} />
            </Grid>
            <Grid item xs={4}>
              <img src={icone5} className="icone" alt="icone" style={{width: '33%', paddingLeft: '30%', paddingBottom: '30%'}} />
            </Grid>
            <Grid item xs={4}>
              <img src={icone4} className="icone" alt="icone" style={{width: '33%', paddingBottom: '30%'}} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

IconeSport.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(IconeSport)
