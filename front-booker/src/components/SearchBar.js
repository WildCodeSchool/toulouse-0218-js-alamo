import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = {
  root: {
    textAlign: 'center'
  }
}

function SimpleSearchBar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={10}
            className={classes.demo}
            direction={'row'}
            justify={'center'}
          >
            <form>
              <h1> RESERVEZ VOTRE SESSION SPORTIVE EN LIGNE </h1>
              <Grid item xs={6}>
                <SearchBar className={classes.search} position="static" color="default"
                  onChange={() => console.log('onChange')}
                  onRequestSearch={() => console.log('onRequestSearch')} />
                <SearchBar className={classes.search} position="static" color="default"
                  onChange={() => console.log('onChange')}
                  onRequestSearch={() => console.log('onRequestSearch')} />
              </Grid>
              <Button className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33'}}>
                Recherchez
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

SimpleSearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SimpleSearchBar)
