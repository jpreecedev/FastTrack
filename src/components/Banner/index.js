import React from 'react'
import { Jumbotron } from 'reactstrap'

import classnames from 'classnames'
import styles from './styles'

const Banner = () => (
  <Jumbotron
    className={classnames('rounded-0', 'mb-3', 'text-center', styles.background)}
  >
    <div className="d-inline-flex">
      <img src="/assets/icon.png" alt="Fast Track" width={48} height={48} />
      <h1
        className={classnames(
          'display-4',
          'align-self-center',
          'ml-2',
          'mr-2',
          'mb-0',
          styles.heading
        )}
      >
        Fast Track
      </h1>
    </div>
    <p className="lead mb-0">Track your fasting activity over time</p>
  </Jumbotron>
)

export default Banner
