import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        Home! <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    )
  }
}

export default Home
