import React from 'react'

import { Button } from 'reactstrap'
import { FastingContext } from '../../context/fasting-context'

const Trigger = () => (
  <FastingContext.Consumer>
    {({ hasStarted, start, stop }) => (
      <div className="d-flex justify-content-center mb-4">
        <Button onClick={() => (hasStarted ? stop() : start())} color="primary" size="lg">
          {hasStarted ? 'Stop fasting' : 'Start a new fast!'}
        </Button>
      </div>
    )}
  </FastingContext.Consumer>
)

export default Trigger
