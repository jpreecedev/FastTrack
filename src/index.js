import React from 'react'
import ReactDOM from 'react-dom'

import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-overrides'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Shell from './components/Shell'
import Home from './pages/Home'

dayjs.extend(relativeTime)

ReactDOM.render(
  <Shell>
    <Home />
  </Shell>,
  document.querySelector('#root')
)
