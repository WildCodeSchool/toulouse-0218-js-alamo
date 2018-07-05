import React from 'react'
import Calendar from 'material-ui-pickers/DatePicker/Calendar'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import moment from 'moment'

const calendarProps = {
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  disablePast: false,
  disableFuture: false,
  allowKeyboardControl: false,
  animateYearScrolling: undefined,
  openToYearSelection: false,
  children: null,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  shouldDisableDate: undefined,
  showToday: true
}

class MyCalendar extends React.Component {
  render () {
    return (
      <Calendar utils={new MomentUtils()} date={moment()} {...calendarProps} onChange={() => {}} />
    )
  }
}

export default MyCalendar
