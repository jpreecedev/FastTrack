import React from 'react'

import DropdownButton from 'components/dropdownButton'
import NavActions from 'components/navActions'
import Breakdown from 'components/breakdown'

export default props => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <NavActions />
                <DropdownButton />
              </div>
            </div>

            <Breakdown />
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
