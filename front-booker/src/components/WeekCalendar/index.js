import React from 'react'

const CAL_HEIGHT = 300
const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const dayHeadStyles = {width: '9%'}
const dayStyles = {width: '13%', height: `${CAL_HEIGHT}px`, fontSize: '11px', position: 'relative', textAlign: 'center'}

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

const getSlotStyle = (ts, isBooked) => {
  const top = CAL_HEIGHT * (ts.mStart - HOUR_MIN) / 1440 + 30
  const height = CAL_HEIGHT * (ts.mEnd - ts.mStart) / 1440
  return {
    position: 'absolute',
    border: '1px solid #ccc',
    top: `${top}px`,
    height: `${height}px`,
    background: isBooked ? '#ffcccc' : '#ccffcc'
  }
}

const isSlotBooked = (ts, reservations) =>
  reservations.find(r => r.timeSlotId === ts.id) !== undefined

const WeekDay = props => (
  <div style={dayStyles}>
    <div>{props.day}</div>
    <div>{props.date.getDate()}</div>
    {
      props.timeSlots.map(
        (ts, k) => <div key={k} style={getSlotStyle(ts, isSlotBooked(ts, props.reservations))}>
          {ts.id}
        </div>
      )
    }
  </div>
)

const getDates = nowDate => {
  const nowDow = nowDate.getDay()
  const dates = []
  for(let d = 1 ; d < 8 ; d++) {
    const date = new Date(nowDate)
    date.setDate(date.getDate() + d - nowDow)
    dates.push(date)
  }
  return dates
}

const formatDate = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

const getReservations = (date, reservations) => {
  console.log(formatDate(date), reservations)
  return reservations.filter(r => r.date === formatDate(date))
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
    const { timeSlots, reservations } = this.props
    const sow = dates[0]
    const sowStr = `${sow.getDate()}/${sow.getMonth() + 1 }`
    const eow = dates[6]
    const eowStr = `${eow.getDate()}/${eow.getMonth() + 1 }`
    return (
      <div>
        <div style={{display: 'flex'}}>
          <div style={{width: '20%', textAlign: 'left'}}><button onClick={() => this.weekChange(-1)} disabled={weekIndex === 0}>&laquo;</button></div>
          <div style={{width: '60%', textAlign: 'center'}}>{sowStr} &mdash; {eowStr}</div>
          <div style={{width: '20%', textAlign: 'right'}}><button onClick={() => this.weekChange(1)}>&raquo;</button></div>
        </div>
        <div style={{display: 'flex'}}>
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

export default WeekCalendar
