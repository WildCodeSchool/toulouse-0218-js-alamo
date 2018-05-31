import React from 'react'
import SimpleAppBar from './NavBar'
import SimpleSearchBar from './SearchBar'

class Homepage extends React.Component {
  render () {
    return (<div>
      < SimpleAppBar />
      < SimpleSearchBar />
    </div>
    )
  }
}

export default Homepage
