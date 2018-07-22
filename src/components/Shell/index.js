import React, { Component } from 'react'
import moment from 'moment-es6'

import { FastingContext } from '../../context/fasting-context'
import {
  DefaultDataStructure,
  getFastingHistory,
  toChartDataFormat,
  startFast,
  stopFast,
  updateFast
} from '../../data-helper'

import Banner from '../Banner'
import Footer from '../Footer'

class Shell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasStarted: false,
      toggleStarted: this.toggleStarted,
      started: null,
      current: null,
      dataset: DefaultDataStructure
    }
  }

  componentDidMount = async () => {
    var fastingData = await getFastingHistory()

    this.setState({
      dataset: fastingData
    })
  }

  toggleStarted = () => {
    const { started } = this.state
    if (started) {
      this.stop()
    } else {
      this.start()
    }
  }

  start = async () => {
    var now = moment()

    var newState = {
      hasStarted: true,
      started: now,
      current: now
    }

    var dataset = toChartDataFormat(await startFast(now), this.state.dataset)

    this.setState(
      {
        ...newState,
        dataset
      },
      () => {
        this.startTimer()
      }
    )
  }

  startTimer = () => {
    const handle = setInterval(async () => {
      var dataset = toChartDataFormat(
        await updateFast(this.state.started),
        this.state.dataset
      )

      this.setState({
        current: moment(),
        handle,
        dataset
      })
    }, 5000)
  }

  stop = () => {
    this.setState(
      {
        hasStarted: false,
        started: null,
        stopped: moment(),
        current: null
      },
      async () => {
        this.stopTimer()
        await stopFast(this.state.stopped)
      }
    )
  }

  stopTimer = () => {
    const { handle } = this.state
    clearInterval(handle)
  }

  render() {
    return (
      <FastingContext.Provider value={this.state}>
        <Banner />
        <main className="pl-3 pr-3">
          {this.props.children}
          <Footer />
        </main>
      </FastingContext.Provider>
    )
  }
}

export default Shell
