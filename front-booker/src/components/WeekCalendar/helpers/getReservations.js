import formatDate from './formatDate'

const getReservations = (date, reservations) => {
  console.log(formatDate(date), reservations)
  return reservations.filter(r => r.date === formatDate(date))
}

export default getReservations
