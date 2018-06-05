import React from 'react'
import Button from '@material-ui/core/Button'
import Navbar from './Navbar'


class Homepage extends React.Component {  
  render () {
    return (<div>
      <Navbar />
      <Button variant="raised" style={{backgroundColor:'#5AD81D'}}>
        Vous êtes gérant de salle de sport ?
      </Button>
      </div>
    )
  }
}

export default Homepage
