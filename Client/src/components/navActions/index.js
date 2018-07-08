import { Button, ButtonGroup } from 'reactstrap'

import React from 'react'

const NavActions = () => {
  return (
    <ButtonGroup>
      <Button className="btn-outline-secondary">Share</Button>
      <Button className="btn-outline-secondary">Export</Button>
    </ButtonGroup>
  )
}

export default NavActions
