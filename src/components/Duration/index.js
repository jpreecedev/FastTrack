import React from 'react'
import moment from 'moment-es6'

import { FastingContext } from '../../context/fasting-context'

function startedDisplay(started, current) {
  return (
    <div className="text-center">
      <p className="lead mb-0">You started fasting</p>
      <h2>{moment(started).from(current)}</h2>
    </div>
  )
}

function notStartedDisplay() {
  return (
    <div className="text-center">
      <p className="lead mb-0">Are you ready to start fasting?</p>
      <h2>Start fasting now!</h2>
    </div>
  )
}

const Duration = () => (
  <FastingContext.Consumer>
    {({ hasStarted, started, current }) => {
      return hasStarted ? startedDisplay(started, current) : notStartedDisplay()
    }}
  </FastingContext.Consumer>
)

export default Duration
