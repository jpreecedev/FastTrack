import React from 'react'
import dayjs from 'dayjs'

import classnames from 'classnames'
import styles from './styles'

const Footer = () => (
  <footer className={classnames('text-center', 'mt-3', 'mb-3', styles.footer)}>
    &copy; Jon Preece Development Ltd, {dayjs().format('YYYY')}.
  </footer>
)

export default Footer
