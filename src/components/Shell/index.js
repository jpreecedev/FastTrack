import React, { Fragment } from 'react'

import Share from '../Share'
import Banner from '../Banner'
import Footer from '../Footer'

const Shell = ({ children }) => (
  <Fragment>
    <Banner />
    <main className="pl-3 pr-3">
      {children}
      <Share />
      <Footer />
    </main>
  </Fragment>
)

export default Shell
