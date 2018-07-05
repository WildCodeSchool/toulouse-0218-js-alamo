import React from 'react'

const CAL_HEIGHT = 300
const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const dayHeadStyles = {width: '9%'}
const dayStyles = {width: '13%', height: `${CAL_HEIGHT}px`, fontSize: '11px', position: 'relative'}

const HOUR_MIN = 360

const mapDayIndex = i => (i + 1) % 7

const hourToMinutes = hour => {
  const [hours, minutes] = hour.substr(0, 5).split(':')
    .map(segment => Number(segment))
  return hours * 60 + minutes
}

const getTimeSlots = (dayIndex, timeSlots) => {
  const dayOfWeek = mapDayIndex(dayIndex)
  return timeSlots.filter(ts => ts.dayOfWeek === dayOfWeek)
    .map(ts => {
      ts.mStart = hourToMinutes(ts.startHour)
      ts.mEnd = hourToMinutes(ts.endHour)
      return ts
    })
}

const getSlotStyle = ts => {
  const top = CAL_HEIGHT * (ts.mStart - HOUR_MIN) / 1440 + 30
  const height = CAL_HEIGHT * (ts.mEnd - ts.mStart) / 1440
  return {
    position: 'absolute',
    border: '1px solid #ccc',
    top: `${top}px`,
    height: `${height}px`
  }
}

const WeekDay = props => (
  <div style={dayStyles}>
    {props.day}
    {
      props.timeSlots.map(
        (ts, k) => <div key={k} style={getSlotStyle(ts)}>
          {ts.id}
        </div>
      )
    }
  </div>
)

class WeekCalendar extends React.Component {
  render () {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <div style={{width: '50%', textAlign: 'left'}}>&laquo;</div>
          <div style={{width: '50%', textAlign: 'right'}}>&raquo;</div>
        </div>
        <div style={{display: 'flex'}}>
          <div style={dayHeadStyles}>
          </div>
          {
            days.map((d, k) => (
              <WeekDay key={k} day={d} timeSlots={getTimeSlots(k, this.props.timeSlots)} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default WeekCalendar
