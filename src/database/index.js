import moment from 'moment-es6'
import { update, add, getLast, getAll } from './helper'

export const DefaultDisplayDateFormat = 'Do MMM'

export function startFast(started) {
  add(moment(started).format())
}

export function getFastDuration(started, stopped) {
  stopped = stopped ? moment(stopped) : moment()
  return Math.round(moment.duration(stopped.diff(started)).asMinutes())
}

export function stopFast(stopped) {
  var last = getLast()
  var updated = {
    ...last,
    stopped: stopped.format(),
    duration: Math.round(moment.duration(stopped.diff(last.started)).asMinutes())
  }

  update(last.started, updated)
}

export function isFastInProgress() {
  var lastRecord = getLast()
  var hasStarted = lastRecord.hasOwnProperty('started')
  var hasStopped = lastRecord.hasOwnProperty('stopped')

  return hasStarted && !hasStopped
}

export function hasFastStopped(record) {
  var hasStarted = record.hasOwnProperty('started')
  var hasStopped = record.hasOwnProperty('stopped')

  return hasStarted && hasStopped
}

export function getHistory() {
  return getAll()
}

export function getLastRecord() {
  return getLast()
}
