import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import icone1 from '../images/icone1S.png'
import icone2 from '../images/icone2S.png'
import icone3 from '../images/icone3S.png'
import iconesjointes from '../images/iconesjointes.png'

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
          >
            <Grid item xs={12}>
              <h1 style={{textAlign: 'center', fontSize: '40px', color: '#49515F', paddingTop: '10vh'}}> En quelques clics...</h1>
            </Grid>
            <Grid item xs={4}>
            <img src={icone1} className="icone" alt="icone1" style={{width: '60%', paddingLeft: '20%', paddingTop: '10vh'}} />
              <h2 style={{fontSize: '20px', paddingBottom: '30vh', color: '#49515F'}}> Trouver un club près de chez soi </h2>
            </Grid>
            <Grid item xs={4}>
              <img src={icone2} className="icone" alt="icone2" style={{width: '60%', paddingLeft: '25%', paddingTop: '10vh'}} />
              <h2 style={{fontSize: '20px', paddingBottom: '30vh', color: '#49515F'}}> Reserver un terrain ou un cours </h2>
            </Grid>
            <Grid item xs={4}>
              <img src={icone3} className="icone" alt="icone3" style={{width: '60%', paddingLeft: '30%', paddingTop: '10vh'}} />
              <h2 style={{fontSize: '20px', paddingBottom: '30vh', color: '#49515F'}}> Enregistrer ses cours et clubs favoris </h2>
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
