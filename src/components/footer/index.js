import React from 'react'

import classnames from 'classnames'
import styles from './styles'

const Footer = () => {
  return (
    <footer className={classnames('text-center', 'mt-5', 'mb-3', styles.footer)}>
      &copy; Jon Preece Development Ltd, 2018.
    </footer>
  )
}

export default Footer
