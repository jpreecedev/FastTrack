import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Home! <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  )
}

export default Home
