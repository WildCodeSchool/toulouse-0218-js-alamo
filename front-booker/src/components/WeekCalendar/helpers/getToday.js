const getToday = () => {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setMilliseconds(0)
  return now
}

export default getToday
