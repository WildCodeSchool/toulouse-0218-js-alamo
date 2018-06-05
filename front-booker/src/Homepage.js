import React from 'react'
import SimpleAppBar from './components/NavBar'
import SimpleSearchBar from './components/SearchBar'

class Homepage extends React.Component {
  render () {
    return (
      <div>
        < SimpleAppBar />
        < SimpleSearchBar />
      </div>
    )
  }
}

export default Homepage
