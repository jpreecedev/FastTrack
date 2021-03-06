import React from 'react'
import ReactDOM from 'react-dom'

import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-overrides.scss'

import { initializeDatabase } from './database/helper'
import Shell from './components/Shell'
import Home from './pages/Home'

initializeDatabase()

ReactDOM.render(
  <Shell>
    <Home />
  </Shell>,
  document.querySelector('#root')
)
