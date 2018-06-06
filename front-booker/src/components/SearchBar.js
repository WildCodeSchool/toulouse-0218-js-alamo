import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MultiSelectField from './SelectBar'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class SimpleSearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root} >
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
            <form>
              <h1 style={{color: '#49515F'}} > RESERVEZ VOTRE SESSION SPORTIVE EN LIGNE </h1>

              <Grid container spacing={0}>
                <Grid item xs={12} sm={4}>
                  < MultiSelectField />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <SearchBar className={classes.search} style={{height: '100%', boxSizing: 'border-box', boxShadow: 'none', border: '1px solid', borderColor: '#A2A9BC'}} position="static"
                    onChange={() => console.log('onChange')}
                    onRequestSearch={() => console.log('onRequestSearch')} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33', height: '100%', boxSizing: 'border-box', boxShadow: 'none', border: '1px solid', borderColor: '#A2A9BC'}}>

                Recherchez
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

SimpleSearchBar.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(SimpleSearchBar)
