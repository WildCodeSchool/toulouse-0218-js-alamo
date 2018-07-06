import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import getSlotStyle from './helpers/getSlotStyle'
import isSlotBooked from './helpers/isSlotBooked'
import { CAL_HEIGHT } from './constants'

const styles = {
  day: {
    width: '13%',
    height: `${CAL_HEIGHT}px`,
    fontSize: '11px',
    position: 'relative',
    textAlign: 'center'
  }
}

const WeekDay = props => (
  <div className={props.classes.day}>
    <Typography component="div">{props.day}</Typography>
    <Typography component="div">{props.date.getDate()}</Typography>
    {
      props.timeSlots.map(
        (ts, k) => <Typography component="div" key={k} style={getSlotStyle(ts, isSlotBooked(ts, props.reservations))}>
          {ts.id}
        </Typography>
      )
    }
  </div>
)

export default withStyles(styles)(WeekDay)
