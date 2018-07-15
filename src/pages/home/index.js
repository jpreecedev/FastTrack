import React, { Fragment } from 'react'

import Chart from '../../components/Chart'
import Duration from '../../components/Duration'
import Trigger from '../../components/Trigger'

const dataset = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  data: [65, 59, 80, 81, 56, 55, 40]
}

const Home = () => (
  <Fragment>
    <Duration />
    <Trigger />
    <Chart dataset={dataset} />
  </Fragment>
)

export default Home
