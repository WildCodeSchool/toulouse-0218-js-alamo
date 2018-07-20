import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = theme => ({
  card: {
    marginRight: 10
  },
  paper: {
    height: 500,
    backgroundColor: '#E6EAF0'
  },
  paperCalendar: {
    height: 270
  }
})

class CardResultEmpty extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Aucun résultat
            </Typography>
            <Typography component="p">
              Nous n'avons trouvé aucun club de sport correspondant à vos critères de recherche.
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}
CardResultEmpty.propTypes = {
  classes: PropTypes.object
}
export default withStyles(styles)(CardResultEmpty)
