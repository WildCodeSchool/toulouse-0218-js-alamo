import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = {
  container: {
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    }
  }
}
class CardResultDefault extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Nom du club
                  </Typography>
                  <Typography component="p">
                    adresse : <br />
                    email: <br />
                    téléphone: <br />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
CardResultDefault.propTypes = {
  classes: PropTypes.object
}
export default withStyles(styles)(CardResultDefault)
