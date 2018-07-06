import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import formatMonth from './helpers/formatMonth'
import getTimeSlots from './helpers/getTimeSlots'
import getDates from './helpers/getDates'
import getReservations from './helpers/getReservations'

import WeekDay from './WeekDay'

const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const dayHeadStyles = {width: '9%'}

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
          <Typography component="div" style={{width: '20%', textAlign: 'left'}}>
            <button onClick={() => this.weekChange(-1)} disabled={weekIndex === 0}>&laquo;</button>
          </Typography>
          <Typography
            component="div"
            style={{fontWeight: 'bold', width: '60%', textAlign: 'center'}}
            dangerouslySetInnerHTML={{__html: dateHeader}} />
          <Typography component="div" style={{width: '20%', textAlign: 'right'}}>
            <button onClick={() => this.weekChange(1)}>&raquo;</button>
          </Typography>
        </div>
        <div className={classes.flex}>
          <div style={dayHeadStyles}>
          </div>
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
