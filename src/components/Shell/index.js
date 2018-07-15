import React, { Component } from 'react'
import dayjs from 'dayjs'

import { FastingContext } from '../../context/fasting-context'

import Banner from '../Banner'
import Footer from '../Footer'

class Shell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasStarted: false,
      toggleStarted: this.toggleStarted,
      started: null,
      current: null
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
    this.setState(
      {
        hasStarted: true,
        started: dayjs(),
        current: dayjs()
      },
      this.startTimer
    )
  }

  startTimer = () => {
    const handle = setInterval(() => {
      this.setState({
        current: dayjs(),
        handle
      })
    }, 1000)
  }

  stop = () => {
    this.setState(
      {
        hasStarted: false,
        started: null,
        stopped: dayjs(),
        current: null
      },
      this.stopTimer
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
