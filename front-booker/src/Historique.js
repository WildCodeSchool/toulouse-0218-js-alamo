import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CardReservation from './CardReservation';
import NavBar from './components/NavBar';

const styles = theme => ({
    paper: {
      backgroundColor: 'none',
      height: 500
    },
  })

class Historique extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
    const { classes, match } = this.props
    const id = Number(match.params.id)
    const user = users.find(user => user.id === id) 
        return (
            <Paper className={classes.paper}>
              <NavBar />
                <Grid container item spacing={0} justify="center">
                    <Grid item xs={12} md={5}>
                        <CardReservation className={classes.item} user={user}/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(Historique)