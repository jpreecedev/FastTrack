import React, { Component } from 'react'
import moment from 'moment-es6'

import { FastingContext } from '../../context/fasting-context'
import {
  getHistory,
  getLastRecord,
  isFastInProgress,
  startFast,
  stopFast
} from '../../database'

import Loading from '../Loading'
import Banner from '../Banner'
import Footer from '../Footer'

class Shell extends Component {
  constructor(props) {
    super(props)
    this.intervalHandle = null
    this.state = {
      hasStarted: false,
      start: this.start,
      stop: this.stop,
      started: null,
      current: null,
      dataset: null,
      loading: true
    }
  }

  componentDidMount = () => {
    var lastRecord = getLastRecord()
    var hasStarted = isFastInProgress()
    var started = hasStarted ? lastRecord.started : null

    this.setState(
      {
        hasStarted,
        started,
        dataset: getHistory(),
        current: moment(),
        loading: false
      },
      () => {
        if (hasStarted) {
          this.startTimer(started)
        }
      }
    )
  }

  start = () => {
    var started = moment()
    this.setState(
      {
        hasStarted: true,
        started,
        current: started
      },
      () => {
        startFast(started)
        this.startTimer(started)
      }
    )
  }

  stop = () => {
    var stopped = moment()
    this.setState(
      {
        hasStarted: false,
        started: null,
        current: null
      },
      () => {
        stopFast(stopped)
        this.stopTimer()
      }
    )
  }

  startTimer = started => {
    this.intervalHandle = setInterval(() => {
      this.setState({
        started,
        current: moment(),
        hasStarted: true
      })
    }, 5000)
  }

  stopTimer = () => {
    clearInterval(this.intervalHandle)
    this.setState({
      started: null,
      current: null,
      hasStarted: false
    })
  }

  render = () => (
    <FastingContext.Provider value={this.state}>
      <Banner />
      <main className="pl-3 pr-3">
        {this.state.loading ? <Loading /> : this.props.children}
        <Footer />
      </main>
    </FastingContext.Provider>
  )
}

export default Shell
