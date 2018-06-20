import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import ResultTransitory from './ResultTransitory'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Reservation from './Reservation'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      research: {},
      step: 0
    }
    this.nextStep = this.nextStep.bind(this)
    this.onResultDone = this.onResultDone.bind(this)
  }
  nextStep () {
    const newStep = this.state.step + 1
    this.setState({
      step: newStep
    })
  }
  onResultDone (result) {
    const newStep = this.state.step + 1
    this.setState({
      result: result,
      step: newStep
    })
  }

  render () {
    const step = this.state.step
    let componentToShow
    if (step === 0) {
      componentToShow = <Homepage nextStep={this.nextStep} />
    } else if (step === 1) {
      componentToShow = <ResultTransitory onResultDone={this.onResultDone}/>
    }
    return (
      <Router>
        <Fragment>
          <div className="App">
            <Switch>
              <Route exact path='/' render={() => componentToShow} />
              <Route path='/reservation/:id' component={Reservation} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App
