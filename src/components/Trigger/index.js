import React from 'react'

import { Button } from 'reactstrap'

const Trigger = ({ starting }) => (
  <div className="d-flex justify-content-center mb-4">
    <Button color="primary" size="lg">
      {starting ? 'Start a new fast!' : 'Stop fasting'}
    </Button>
  </div>
)

export default Trigger
