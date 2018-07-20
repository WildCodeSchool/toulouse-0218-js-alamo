import React from 'react'
import classNames from 'class-names'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MultiSelectField from './SelectBar'
import Collapse from '@material-ui/core/Collapse'
import IntegrationAutosuggest from './Autosuggest'
<<<<<<< HEAD
import './Slide.css'
import zIndex from '@material-ui/core/styles/zIndex';

=======
>>>>>>> 18a37be362300727cd8d48b51163cc67b35cc831

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

    // Détecter si on est sur la homepage initiale, ou
    // sur les résultats de recherche
    // Si on a les paramètres sport et city dans l'URL, hasSearchParams vaut true
    const { params } = props.match
    const hasSearchParams = Object.keys(params).length === 2
    this.state = {
      city: hasSearchParams ? params.city : '',
      sport: hasSearchParams ? params.sport : '',
      missing: {
        city: false,
        sport: false
      }
    }
  }

  // Vérifie que les champs requis sont renseignés
  checkFields = override => {
    console.log(this.state)
    const fields = override || ['city', 'sport']
    // On crée un objet où on va stocker une valeur true/false
    // associée à chaque clé (city ou sport)
    let missing = {}
    let ok = true
    for (let field of fields) {
      console.log(field, this.state[field], !this.state[field])
      if (this.state[field] === '') {
        missing[field] = true
        ok = false
      }
    }
    this.setState({ missing })
    return ok
  }

  onSubmit = e => {
    e.preventDefault()
    if (!this.checkFields()) {
      return
    }
    const { sport, city } = this.state
    this.props.history.push(`/s/${sport}/${city}`)
  }

  researchOnEnter = e => {
    if (e.keyCode !== 13) {
      return
    }
    this.onSubmit()
  }

  onSportChange = sport => {
    const missing = {...this.state.missing, sport: false }
    this.setState({ sport, missing })
  }

  onCityChange = city => {
    const missing = {...this.state.missing, city: false }
    this.setState({ city, missing })
  }

  render () {
    const { classes, hasSearchResults } = this.props
    const { missing } = this.state
    const gridHeight = hasSearchResults ? '50px' : '60vh'
    return (
<<<<<<< HEAD
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
=======
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

            <form onSubmit={this.onSubmit}>
              {!hasSearchResults && <h1 style={{color: '#49515F'}} > Réservez votre session sportive en ligne </h1>}

              <Grid container spacing={0} >
                <Grid item xs={12} sm={5}>
                  {/* <MultiSelectField missing={missing.sport} onSelect={this.onSportChange} /> */}
                  <IntegrationAutosuggest
                    placeholder='Choisissez un sport'
                    initialValue={this.state.sport}
                    dataUrl='/api/sports'
                    missing={missing.sport}
                    onChange={this.onSportChange} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <IntegrationAutosuggest
                    placeholder='Choisissez une ville'
                    initialValue={this.state.city}
                    dataUrl='/api/cities'
                    missing={missing.city}
                    onChange={this.onCityChange} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button type="submit" className={classes.btn} variant="raised" style={{backgroundColor: '#66FF33', height: '100%', padding: '10', boxSizing: 'border-box', boxShadow: 'none', border: '1px solid', borderColor: '#A2A9BC'}}>
                    Recherchez
                  </Button>
                </Grid>
>>>>>>> 18a37be362300727cd8d48b51163cc67b35cc831
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
