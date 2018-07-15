import React from 'react'
import dayjs from 'dayjs'

import { FastingContext } from '../../context/fasting-context'

const startedDisplay = (started, current) => (
  <div className="text-center">
    <p className="lead mb-0">You started fasting</p>
    <h2>{dayjs(started).from(current)}</h2>
  </div>
)

const notStartedDisplay = (
  <div className="text-center">
    <p className="lead mb-0">Are you ready to start fasting?</p>
    <h2>Start fasting now!</h2>
  </div>
)

const Duration = () => (
  <FastingContext.Consumer>
    {({ hasStarted, started, current }) =>
      hasStarted ? startedDisplay(started, current) : notStartedDisplay
    }
  </FastingContext.Consumer>
)

export default Duration
