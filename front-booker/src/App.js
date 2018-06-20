import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
    // const step = this.state.step
    // let componentToShow
    // if (step === 0) {
    //   componentToShow = <Homepage step={this.state.step} nextStep={this.nextStep} />
    // } else if (step === 1) {
    //   componentToShow = <ResultTransitory onResultDone={this.onResultDone}/>
    // }
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/s/:sport/:city" component={Homepage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
