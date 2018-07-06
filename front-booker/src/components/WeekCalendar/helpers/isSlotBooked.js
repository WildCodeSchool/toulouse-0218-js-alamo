const isSlotBooked = (ts, reservations) =>
  reservations.find(r => r.timeSlotId === ts.id) !== undefined

export default isSlotBooked
