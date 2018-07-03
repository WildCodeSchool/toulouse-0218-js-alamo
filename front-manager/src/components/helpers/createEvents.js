import moment from 'moment'

const createEvents = (timeslots) => {
  return timeslots.reduce(createEventsForTimeslot, [])
}

const createEventsForTimeslot = (acc, timeslot) => {
  console.log(timeslot)
  const events = []
  const dateStart = moment().day(timeslot.dayOfWeek)
  const dateEnd = moment().day(timeslot.dayOfWeek)
  const [hoursStart, minutesStart] = timeslot.startHour.split(':')
  const [hoursEnd, minutesEnd] = timeslot.endHour.split(':')
  dateStart.hours(hoursStart)
  dateStart.minutes(minutesStart)
  dateEnd.hours(hoursEnd)
  dateEnd.minutes(minutesEnd)
  for (let i = 0; i < 52; i++) {
    events.push({
      title: timeslot.title,
      start: dateStart.format(),
      end: dateEnd.format(),
      resourceId: timeslot.resourceId
    })
    dateStart.add(7, 'd')
    dateEnd.add(7, 'd')
  }
  return acc.concat(events)
}

export default createEvents
