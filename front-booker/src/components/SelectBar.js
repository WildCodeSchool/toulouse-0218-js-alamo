import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import '../css/react-select.min.css'
import './SelectBar.css'

const sports = [
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Equitation', value: 'equitation' }
]

const styles = {
  borderIdle: {
    border: '1px solid #A2A9BC'
  },
  borderOk: {
    border: '1px solid #A2FFBC'
  },
  borderError: {
    border: '1px solid #FFA9BC'
  }
}

class SelectBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      removeSelected: true,
      disabled: false,
      stayOpen: false,
      value: [],
      rtl: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value)
    this.props.onSelect(value)
    this.setState({ value })
  }

  toggleCheckbox (e) {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  toggleRtl (e) {
    let rtl = e.target.checked
    this.setState({ rtl })
  }

  render () {
    const { disabled, stayOpen, value } = this.state
    const { classes, missing } = this.props
    const selectClass = missing ? classes.borderError : classes.borderIdle
    const options = sports
    return (
      <div className="section" style={{height: '100%'}}>
        <Select
          className={selectClass}
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="Choisissez un sport"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
          style={{ fontFamily: 'Roboto, Helvetica', borderRadius: 0, border: 'none', padding: '10px', verticalAlign: 'middle' }}
        />
      </div>
    )
  }
}

SelectBar.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  onSelect: PropTypes.func
}

export default withStyles(styles)(SelectBar)
