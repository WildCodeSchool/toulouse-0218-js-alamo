import mapDayIndex from './mapDayIndex'
import hourToMinutes from './hourToMinutes'

const getTimeSlots = (dayIndex, timeSlots) => {
  const dayOfWeek = mapDayIndex(dayIndex)
  return timeSlots.filter(ts => ts.dayOfWeek === dayOfWeek)
    .map(ts => {
      ts.mStart = hourToMinutes(ts.startHour)
      ts.mEnd = hourToMinutes(ts.endHour)
      return ts
    })
}

export default getTimeSlots
