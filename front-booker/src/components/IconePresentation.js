import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
    flexGrow: 1
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
            spacing={2}
            className={classes.demo}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
          >
            <Grid item xs={12}>
              <h1 style={{textAlign: 'center', fontSize: '20px', color: '#000000', paddingTop: '3vh'}}> En quelques clics...</h1>
            </Grid>
            <Grid container spacing={1} justify="center" >
              <Grid item xs={12} md={4} style={{width: '50%'}} >
                <h4 style={{color: '#00ccff', paddingLeft: '0vh'}} > Réservez votre session sportive en ligne </h4>
              </Grid>
              <Grid item xs={12} md={4} style={{width: '50%'}} justify="center" >
                <h4 style={{color: '#00ccff', paddingLeft: '5vh'}} > Réservez votre session sportive en ligne </h4>
              </Grid>
              <Grid item xs={12} md={4} style={{width: '50%'}} justify="left" >
                <h4 style={{color: '#00ccff', paddingLeft: '10vh'}} > Réservez votre session sportive en ligne </h4>
              </Grid>
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
