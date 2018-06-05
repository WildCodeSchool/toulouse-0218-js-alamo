import React from 'react'

class ResultTransitory extends React.Component {
  render () {
    return (
      <div>
        <p>Filtrer par:</p>
        <input className="date" type="date" placeholder="Date"/>
        <button>Appliquer</button>
      </div>
    )
  }
}

export default ResultTransitory
