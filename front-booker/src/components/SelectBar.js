import React from 'react'
// import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import '../css/react-select.min.css'

const sports = [
  { label: 'Badminton', value: 'badminton' },
  { label: 'Tennis', value: 'tennis' },
  { label: 'Equitation', value: 'equitation' }
]

class MultiSelectField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      removeSelected: true,
      disabled: false,
      crazy: false,
      stayOpen: false,
      value: [],
      rtl: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value)
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
    const { crazy, disabled, stayOpen, value } = this.state
    const options = sports
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="Selectionne ton sport"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />
      </div>
    )
  }
}

MultiSelectField.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string
}

export default MultiSelectField
