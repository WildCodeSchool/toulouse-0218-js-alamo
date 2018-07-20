import React from 'react'
import classNames from 'class-names'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MultiSelectField from './SelectBar'
import Collapse from '@material-ui/core/Collapse'
import IntegrationAutosuggest from './Autosuggest'
import './Slide.css'
import zIndex from '@material-ui/core/styles/zIndex';


const styles = _theme => ({
  root: {
    flexGrow: "1",
    // background: 'url("/images/image1.png")no-repeat center; background-size: cover'
  },
  btn: {
    color: 'none',
    borderColor: '#000000',
    border: '1px solid'
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
      <div style={{position:'relative'}}>
          <div class='slider' style={{ maxHeight: (hasSearchResults ? 0 : '500px') }}>
              <div class='slide1'></div>
              <div class='slide2'></div>
              <div class='slide3'></div>
              <div class='slide4'></div>
          </div>
    
          <Collapse in={!hasSearchResults} collapsedHeight="10"style={{zIndex:'50', position:'absolute',top:'0',width: '100%'}}>
            <Grid item xs={12}>
              <Grid
                container 
                className={classNames(classes.demo, classes.root)}
                direction={'row'}
                justify={'center'}
                alignItems={'center'}
                style={{height: gridHeight}} // A VOIR AVEC BENOIT MET UNE MARGE EN BAS DE PAGE !
              >
                <form>
                  {!hasSearchResults && <h1 style={{color: '#000000'}} > Réservez votre session sportive en ligne </h1>}
                  <Grid container spacing={0} >
                    <Grid item xs={12} sm={5}>
                      <MultiSelectField onSelect={sport => this.setState({ sport })} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <IntegrationAutosuggest onChange={city => this.setState({ city})} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button className={classes.btn} onClick={this.onSubmit} variant="raised" style={{backgroundColor: '#00ccff', height: '100%',padding: '10',  boxShadow: '0 3px 0px 2px', borderColor: '#000000' }}>
                        Recherchez
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Collapse>
        </div>
     
    )
  }
}

SearchLocationBar.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func
}
export default withStyles(styles)(SearchLocationBar)
