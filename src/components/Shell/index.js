import React, { Component } from 'react'
import moment from 'moment-es6'

import { FastingContext } from '../../context/fasting-context'
import { startFast, stopFast, getFastingHistory } from '../../database'

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
      dataset: {
        labels: [],
        data: []
      }
    }
  }

  componentDidMount = async () => {
    var data = await getFastingHistory()
    var mapped = data.map(function(item) {
      var started = moment(item.started)
      var stopped = item.stopped ? moment(item.stopped) : moment()
      var duration = moment.duration(stopped.diff(started))
      return {
        label: started.format('Do MMM'),
        duration: duration.asMinutes()
      }
    })

    if (mapped.length) {
      this.setState({
        dataset: {
          labels: [...mapped.map(x => x.label)],
          data: [...mapped.map(x => x.duration)]
        }
      })
    } else {
      this.setState({
        dataset: {
          labels: [],
          data: []
        }
      })
    }
  }

  toggleStarted = () => {
    const { started } = this.state
    if (started) {
      this.stop()
    } else {
      this.start()
    }
  }

  start = () => {
    var now = moment()
    var label = now.format('Do MMM')
    var duration = 0

    var newState = {
      hasStarted: true,
      started: now,
      current: now,
      dataset: {
        labels: [...this.state.dataset.labels, label],
        data: [...this.state.dataset.data, duration]
      }
    }

    this.setState(newState, async () => {
      this.startTimer()
      await startFast(this.state.started)
    })
  }

  startTimer = () => {
    const handle = setInterval(() => {
      this.setState({
        current: moment(),
        handle
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
