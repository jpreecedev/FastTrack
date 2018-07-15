import React, { Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

// Pages
import Dashboard from './pages/dashboard'
import Home from './pages/home'

// Layout
import Footer from 'components/footer'
import Nav from 'components/nav'

export default () => (
  <Router>
    <Fragment>
      <Nav />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/" component={Home} />
      <Footer />
    </Fragment>
  </Router>
)
