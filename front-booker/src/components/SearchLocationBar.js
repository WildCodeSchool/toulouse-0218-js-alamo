import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MultiSelectField from './SelectBar'
import Collapse from '@material-ui/core/Collapse'
import IntegrationAutosuggest from './Autosuggest'



const styles = _theme => ({
  root: {
    flexGrow: 1
  },
  btn: {
    color: 'white'
  }
})

class SearchLocationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      city:'',
      sport: ''
    }
  }

  onSubmit = () => this.props.history.push(`/s/${this.state.sport}/${this.state.city}`)

  researchOnEnter = e => {
    if(e.keyCode !== 13) {
      return
    }
    this.onSubmit()
  }

  render () {
    const { classes, hasSearchResults } = this.props
    const gridHeight = hasSearchResults ? '50px' : '60vh'
    return (
      <Collapse in={!hasSearchResults} collapsedHeight="100px">
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
            style={{height: gridHeight}} // A VOIR AVEC BENOIT MET UNE MARGE EN BAS DE PAGE !
          >

            <form>
              {!hasSearchResults && <h1 style={{color: '#49515F'}} > Réservez votre session sportive en ligne </h1>}

              <Grid container spacing={0}>
                <Grid item xs={12} sm={5}>
                  <MultiSelectField onSelect={sport => this.setState({ sport })}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                <IntegrationAutosuggest onChange={city => this.setState({ city})} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button className={classes.btn} onClick={this.onSubmit} variant="raised" style={{backgroundColor: '#66FF33', height: '100%',padding: '10', boxSizing: 'border-box', boxShadow: 'none', border: '1px solid', borderColor: '#A2A9BC'}}>
                    Recherchez
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Collapse>
    )
  }
}

SearchLocationBar.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(SearchLocationBar)
