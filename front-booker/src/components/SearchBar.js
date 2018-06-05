import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// import MultiSelectField from './SelectBar'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  }
})

class SimpleSearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className="classes.root">
        <Grid item xs={12}>
          <Grid
            container
            spacing={10}
            className="classes.demo"
            direction={'row'}
            justify={'center'}
          >
            <form>
              <h1> RESERVEZ VOTRE SESSION SPORTIVE EN LIGNE </h1>

              <Grid container spacing={24}>
                <Grid item xs={4}>             
                </Grid>
                <Grid item xs={4}>
                  <SearchBar className="classes.search" position="static" color="default"
                    onChange={() => console.log('onChange')}
                    onRequestSearch={() => console.log('onRequestSearch')} />
                </Grid>
                <Grid item xs={4}>
                  <Button className="classes.btn" variant="raised" style={{backgroundColor: '#66FF33'}}>
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

export default withStyles(styles)(SimpleSearchBar)
