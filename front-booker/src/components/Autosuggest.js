import React from 'react'
import classNames from 'class-names'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

const suggestions = [
  { label: '' }
]

function renderInput (inputProps) {
  const { classes, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        disableUnderline: true,
        inputRef: ref,
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  )
}

function renderSuggestion (suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)
  const exactMatch = suggestion.label.toLowerCase() === this.state.value.toLowerCase()
  const background = exactMatch ? '#ABFF90' : '#FFF'
  return (
    <MenuItem style={{background}} selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer (options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue (suggestion) {
  return suggestion.label
}

function getSuggestions (value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep = count < 5 &&
        suggestion.label.toLowerCase().slice(0, inputLength) === inputValue
      if (keep) {
        count += 1
      }

      return keep
    })
}

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.common.white,
    boxSizing: 'border-box',
    border: '1px solid #A2A9BC',
    flexGrow: 1,
    position: 'relative',
    height: '100%'
  },
  borderIdle: {
    border: '1px solid #A2A9BC'
  },
  borderOk: {
    border: '1px solid #A2FFBC'
  },
  borderError: {
    border: '1px solid #FFA9BC'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  input: {
    padding: '18px 16px 10px 16px',
    boxSizing: 'border-box',
    height: '100%'
  }
})

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    exactMatch: false,
    suggestions: []
  }

  // Pour demander des suggestions au serveur
  _handleSuggestionsFetchRequested = ({ value }) =>
    fetch('/api/cities?search=' + encodeURIComponent(value))
      .then(res => res.json())
      .then(this.onSuggestionsReceived(value))

  // Appelé quand le serveur nous a renvoyé les suggestions
  onSuggestionsReceived = value => suggestions =>
    this.setState({suggestions}, () => this.lookupCity(value))

  get handleSuggestionsFetchRequested () {
    return this._handleSuggestionsFetchRequested
  }
  set handleSuggestionsFetchRequested (value) {
    this._handleSuggestionsFetchRequested = value
  }
  // Recherche une ville dans les suggestions
  lookupCity = value => {
    const search = value || this.state.value
    const city = this.state.suggestions.find(city => city.label.toLowerCase() === search.toLowerCase())
    const exactMatch = city !== undefined
    this.setState({ exactMatch })
    this.props.onChange(city ? city.slug : '')
  }

  handleSuggestionsClearRequested = () => {
    // console.log('clear', this.state.value)
    // this.lookupCity()
    // this.setState({ suggestions: [] })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    }, () => this.lookupCity(newValue))
  }

  render () {
    const { classes, missing } = this.props
    const { exactMatch } = this.state
    const borderClass = missing ? classes.borderError
      : (exactMatch ? classes.borderOk : classes.borderIdle)
    return (
      <Autosuggest style={{disableUnderline: true}}
        theme={{
          container: classNames(classes.container, borderClass),
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion.bind(this)}
        inputProps={{
          classes: classes,
          placeholder: 'Choisissez une ville',
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IntegrationAutosuggest)
