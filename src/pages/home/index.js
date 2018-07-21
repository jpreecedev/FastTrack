import React, { Fragment } from 'react'

import { FastingContext } from '../../context/fasting-context'

import Chart from '../../components/Chart'
import Duration from '../../components/Duration'
import Trigger from '../../components/Trigger'

const Home = () => (
  <Fragment>
    <Duration />
    <Trigger />
    <FastingContext.Consumer>
      {({ dataset }) => {
        return dataset.labels.length > 0 && <Chart dataset={dataset} />
      }}
    </FastingContext.Consumer>
  </Fragment>
)

export default Home
