import { CAL_HEIGHT, HOUR_MIN, COLOR_PRIMARY, COLOR_SECONDARY } from '../constants'

const getSlotStyle = (ts, isBooked) => {
  const top = CAL_HEIGHT * (ts.mStart - HOUR_MIN) / 1440 + 30
  const height = CAL_HEIGHT * (ts.mEnd - ts.mStart) / 1440
  return {
    top: `${top}px`,
    height: `${height}px`,
    background: isBooked ? COLOR_SECONDARY : COLOR_PRIMARY
  }
}

export default getSlotStyle
