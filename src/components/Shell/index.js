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
} from '../../database'

import Loading from '../Loading'
import Banner from '../Banner'
import Footer from '../Footer'

class Shell extends Component {
  state = {
    hasStarted: false,
    toggleStarted: this.toggleStarted,
    started: null,
    current: null,
    dataset: DefaultDataStructure,
    loading: true
  }

  componentDidMount = async () => {
    var fastingDataset = await getFastingHistory()
    var last = fastingDataset.data.pop()

    if (last && !last.stopped) {
      this.toggleStarted(moment(last.started))
    } else {
      this.setState({
        dataset: fastingDataset,
        loading: false
      })
    }
  }

  toggleStarted = when => {
    const { started } = this.state
    if (started) {
      this.stop()
    } else {
      this.start(when)
    }
  }

  start = async when => {
    var now = when || moment()

    var newState = {
      hasStarted: true,
      started: now,
      current: moment()
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
