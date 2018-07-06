import {
  CAL_HEIGHT,
  HOUR_MIN,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_GRAY
} from '../constants'

const getSlotStyle = (ts, isBookable, isBooked) => {
  const top = CAL_HEIGHT * (ts.mStart - HOUR_MIN) / 1440
  const height = CAL_HEIGHT * (ts.mEnd - ts.mStart) / 1440
  const background = ! isBookable ? COLOR_GRAY :
    (isBooked ? COLOR_SECONDARY : COLOR_PRIMARY)
  return {
    top: `${top}px`,
    height: `${height}px`,
    background
  }
}

export default getSlotStyle
