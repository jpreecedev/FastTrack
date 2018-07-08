import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <NavLink className="logo" to="/">
            Fast Track
          </NavLink>
        </header>
      </div>
    )
  }
}
