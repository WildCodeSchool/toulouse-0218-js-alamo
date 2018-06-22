import React from 'react'
import CardResultMember from './CardResultMember'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import clubs from './clubs'
import CardReservation from './CardReservation';

const styles = theme => ({
    paper: {
      backgroundColor: '#E6EAF0',
      height: 500
    }
  })

class Reservation extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
    const { classes, match } = this.props
    const id = Number(match.params.id)
    const club = clubs.find(club => club.id === id) 
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <CardReservation club={club}/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(Reservation)
