import { CAL_HEIGHT, HOUR_MIN } from '../constants'

const getSlotStyle = (ts, isBooked) => {
  const top = CAL_HEIGHT * (ts.mStart - HOUR_MIN) / 1440 + 30
  const height = CAL_HEIGHT * (ts.mEnd - ts.mStart) / 1440
  return {
    position: 'absolute',
    border: '1px solid #ccc',
    top: `${top}px`,
    height: `${height}px`,
    background: isBooked ? '#ffcccc' : '#ccffcc'
  }
}

export default getSlotStyle
