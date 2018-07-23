import React from 'react'
import moment from 'moment-es6'

import classnames from 'classnames'
import styles from './styles.scss'

const Footer = () => (
  <footer className={classnames('text-center', 'mt-3', 'mb-3', styles.footer)}>
    &copy; Jon Preece Development Ltd, {moment().format('YYYY')}.
  </footer>
)

export default Footer
