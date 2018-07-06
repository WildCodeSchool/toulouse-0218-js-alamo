const hourToMinutes = hour => {
  const [hours, minutes] = hour.substr(0, 5).split(':')
    .map(segment => Number(segment))
  return hours * 60 + minutes
}

export default hourToMinutes
