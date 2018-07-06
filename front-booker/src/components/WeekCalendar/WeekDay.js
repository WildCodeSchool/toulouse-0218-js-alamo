import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import getSlotStyle from './helpers/getSlotStyle'
import isSlotBooked from './helpers/isSlotBooked'
import formatHour from './helpers/formatHour'
import { CAL_HEIGHT } from './constants'

const styles = {
  day: {
    width: '13%',
    height: `${CAL_HEIGHT}px`,
    fontSize: '11px',
    position: 'relative',
    textAlign: 'center'
  },
  slot: {
    position: 'absolute',
    width: '96%',
    marginLeft: '2%',
    color: '#fff',
    fontSize: '10px',
    paddingTop: '1px'
  }
}

const WeekDay = props => (
  <div className={props.classes.day}>
    <Typography component="div">{props.day}</Typography>
    <Typography component="div">{props.date.getDate()}</Typography>
    {
      props.timeSlots.map(
        (ts, k) => <Typography
          component="div"
          className={props.classes.slot}
          key={k}
          style={getSlotStyle(ts, isSlotBooked(ts, props.reservations))}>
          {formatHour(ts.startHour)}
        </Typography>
      )
    }
  </div>
)

export default withStyles(styles)(WeekDay)
