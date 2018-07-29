import moment from 'moment-es6'
import { update, add, getLast, getAll } from './helper'

export const DefaultDisplayDateFormat = 'Do MMM'

export function startFast(started) {
  var formatted = moment(started).format()
  var newData = {
    started: formatted
  }

  add(newData)
}

export function getFastDuration(started, stopped) {
  stopped = stopped || moment()
  return Math.round(moment.duration(stopped.diff(started)).asMinutes())
}

export async function stopFast(stopped) {
  var last = getLast()
  var updated = {
    ...last,
    stopped: stopped.format(),
    duration: Math.round(moment.duration(stopped.diff(last.started)).asMinutes())
  }

  update(last.started, updated)
}

export function getHistory() {
  return getAll()
}
