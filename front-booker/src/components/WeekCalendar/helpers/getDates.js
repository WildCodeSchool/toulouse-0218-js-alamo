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

export default getDates
