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
            <img src={iconesjointes} className="iconesjointes" alt="iconesjointes" style={{ paddingLeft: '5vh'}} />
    
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
