import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import getSlotStyle from './helpers/getSlotStyle'
import isSlotBooked from './helpers/isSlotBooked'
import formatHour from './helpers/formatHour'
import { CAL_HEIGHT } from './constants'

const styles = {
  day: {
    width: '14.25%',
    height: `${CAL_HEIGHT}px`,
    fontSize: '11px',
    textAlign: 'center'
  },
  slot: {
    position: 'absolute',
    width: '92%',
    marginLeft: '4%',
    color: '#fff',
    fontSize: '10px',
    paddingTop: '1px',
    '&:hover': {
      opacity: 0.6
    }
  },
  slotsWrapper: {
    position: 'relative'
  }
}

const WeekDay = ({ classes, day, date, now, reservations, timeSlots, onClickSlot }) => (
  <div className={classes.day}>
    <Typography component="div">{day}</Typography>
    <Typography component="div">{date.getDate()}</Typography>
    <div className={classes.slotsWrapper}>
      {
        timeSlots.map(
          (ts, k) => {
            const isBookable = date >= now
            const isBooked = isSlotBooked(ts, reservations)
            return (
              <Typography
                onClick={e => onClickSlot(ts, date, isBookable, isBooked, e)}
                component="div"
                className={classes.slot}
                key={k}
                style={getSlotStyle(ts, isBookable, isBooked)}>
                {formatHour(ts.startHour)}
              </Typography>
            )
          }
        )
      }
    </div>
  </div>
)

export default withStyles(styles)(WeekDay)
