import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'

const Nav = () => (
  <nav className="d-flex flex-row-reverse mb-3">
    <ButtonGroup>
      <Button className="btn-outline-secondary">Share</Button>
      <Button className="btn-outline-secondary">Export</Button>
    </ButtonGroup>
  </nav>
)

export default Nav
