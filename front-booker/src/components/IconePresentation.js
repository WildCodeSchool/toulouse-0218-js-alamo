import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import icone1 from '../images/icone1.png'
import icone2 from '../images/icone2.png'
import icone3 from '../images/icone3.png'

const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: '#E6EAF0'
  }
}

class IconePresentation extends React.Component {
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
            spacing={8}
            className={classes.demo}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
            style={{height: '60vh'}}
          >
            <Grid item xs={12}>
              <h1 style={{textAlign: 'center'}}> En quelques clics ...</h1>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper} >
                <img src={icone1} className="icone" alt="icone" style={{width: '33%', paddingLeft: '50%', paddingBottom: '30%'}} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <img src={icone2} className="icone" alt="icone" style={{width: '33%', paddingLeft: '30%', paddingBottom: '30%'}} />
            </Grid>
            <Grid item xs={4}>
              <img src={icone3} className="icone" alt="icone" style={{width: '33%', paddingBottom: '30%'}} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

IconePresentation.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(IconePresentation)
