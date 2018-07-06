import formatDate from './formatDate'

const getReservations = (date, reservations) => {
  return reservations.filter(r => r.date === formatDate(date))
}

export default getReservations
