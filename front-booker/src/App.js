import React, { Component, Fragment } from 'react'
import Homepage from './Homepage'
import ResultTransitory from './ResultTransitory'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {},
      step: 0
    }
    this.nextStep = this.nextStep.bind(this)
    this.onResultDone = this.onResultDone.bind(this)
  }
  nextStep () {
    const newStep = this.state.step + 1
    this.setStep({
      step: newStep
    })
  }
  onResultDone (result) {
    const newStep = this.state.step + 1
    this.setStep({
      result: result,
      step: newStep
    })
  }

  render () {
    const step = this.state.step
    let componentToShow
    if (step === 0) {
      componentToShow = <Homepage onResultDone={this.onResultDone}/>
    } else if (step === 1) {
      componentToShow = <ResultTransitory />
    }
    return (
      <Fragment>
        <div className="App">
          {componentToShow}
        </div>
      </Fragment>
    )
  }
}

export default App
