import React, { Fragment } from 'react'

import Chart from '../../components/Chart'
import Duration from '../../components/Duration'
import Trigger from '../../components/Trigger'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Duration of last fast',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

const Home = () => (
  <Fragment>
    <Duration />
    <Trigger starting={false} />
    <Chart data={data} />
  </Fragment>
)

export default Home
