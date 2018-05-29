import React from 'react'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'
import createMuiTheme  from '@material-ui/core/styles'

class Homepage extends React.Component {  
  render () {
    return (<Button variant="raised" style={{backgroundColor:'#5AD81D'}}>
          Vous êtes gérant de salle de sport ?
        </Button>
    )
  }
}

export default Homepage
