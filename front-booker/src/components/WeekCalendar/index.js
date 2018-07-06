import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import formatMonth from './helpers/formatMonth'
import getTimeSlots from './helpers/getTimeSlots'
import getDates from './helpers/getDates'
import getReservations from './helpers/getReservations'

import WeekDay from './WeekDay'

const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
// const dayHeadStyles = {width: '9%'}

const styles = {
  flex: {
    display: 'flex'
  }
}

class WeekCalendar extends React.Component {
  constructor (props) {
    super(props)
    const now = new Date()
    this.state = {
      weekIndex: 0,
      now,
      dates: getDates(now)
    }
  }
  weekChange = increment => {
    this.setState((prevState, props) => {
      const weekIndex = prevState.weekIndex + increment
      const now = new Date()
      let day = now.getDate()
      day += weekIndex * 7
      now.setDate(day)
      const dates = getDates(now)
      return {
        weekIndex,
        now,
        dates
      }
    })
  }
  render () {
    const { weekIndex, dates } = this.state
    const { timeSlots, reservations, classes } = this.props
    const sow = dates[0]
    const sowMonth = sow.getMonth()
    const eow = dates[6]
    const eowMonth = eow.getMonth()
    const dateHeader = sowMonth === eowMonth ?
      `${sow.getDate()} &mdash; ${eow.getDate()} ${formatMonth(sowMonth)}` :
      `${sow.getDate()}&nbsp;${formatMonth(sowMonth)} - ${eow.getDate()}&nbsp;${formatMonth(eowMonth)}`
    return (
      <div>
        <div className={classes.flex}>
          <IconButton
            size="small"
            onClick={() => this.weekChange(-1)} disabled={weekIndex === 0}>
            <ChevronLeft />
          </IconButton>
          <Typography
            component="div"
            style={{fontWeight: 'bold', flexGrow: 1, textAlign: 'center', paddingTop: '14px'}}
            dangerouslySetInnerHTML={{__html: dateHeader}} />
          <IconButton
            size="small" onClick={() => this.weekChange(1)}>
            <ChevronRight />
          </IconButton>
        </div>
        <div className={classes.flex}>
          {/* <div style={dayHeadStyles}></div> */}
          {
            days.map((d, k) => (
              <WeekDay key={k} day={d} date={dates[k]} timeSlots={getTimeSlots(k, timeSlots)} reservations={getReservations(dates[k], reservations)} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(WeekCalendar)
