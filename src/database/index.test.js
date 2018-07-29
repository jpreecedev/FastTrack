import moment from 'moment-es6'

import { startFast, stopFast, getFastDuration, getHistory } from './index'
import { add, update, getLast, getAll } from './helper'

jest.mock('./helper')

describe('Database tests', function() {
  beforeEach(function() {
    add.mockClear()
    update.mockClear()
    getLast.mockClear()
    getAll.mockClear()
  })

  it('should add the new fast to the database', function() {
    var started = moment().format()
    var result = {
      started
    }

    startFast(started)

    expect(add).toHaveBeenCalledTimes(1)
    expect(add).toHaveBeenCalledWith(result)
  })

  it('should result in a fast of 3 minutes when stopped is not supplied', function() {
    var started = moment().subtract(3, 'minutes')

    var duration = getFastDuration(started)

    expect(duration).toBe(3)
  })

  it('should result in a fast of 5 minutes when stopped is provided', function() {
    var started = moment()
    var stopped = moment().add(5, 'minutes')

    var duration = getFastDuration(started, stopped)

    expect(duration).toBe(5)
  })

  it('should result in a fast of 1 hour when stopped is provided', function() {
    var started = moment()
    var stopped = moment().add(1, 'hours')

    var duration = getFastDuration(started, stopped)

    expect(duration).toBe(60)
  })

  it('should stop the last fast', function() {
    var started = moment().format()
    var stopped = moment().add(1, 'years')
    var duration = Math.round(moment.duration(stopped.diff(started)).asMinutes())

    var expectedResult = {
      started,
      stopped: stopped.format(),
      duration
    }

    getLast.mockImplementation(function() {
      return { started }
    })

    startFast(started)
    stopFast(stopped)

    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(started, expectedResult)
  })

  it('should return an empty record set when there is no fasting history', function() {
    var expectedResult = {
      records: []
    }

    getAll.mockImplementation(function() {
      return expectedResult
    })

    var result = getHistory()

    expect(result).toEqual(expectedResult)
  })

  it('should return one record for fasting history', function() {
    var started = moment().format()
    var expectedResult = {
      records: [
        {
          started
        }
      ]
    }

    getAll.mockImplementation(function() {
      return expectedResult
    })

    var result = getHistory()

    expect(result).toEqual(expectedResult)
  })

  it('should return two records for fasting history', function() {
    var started = moment().format()
    var secondStarted = moment()
      .add(1, 'years')
      .format()
    var expectedResult = {
      records: [
        {
          started
        },
        {
          started: secondStarted
        }
      ]
    }

    getAll.mockImplementation(function() {
      return expectedResult
    })

    var result = getHistory()

    expect(result).toEqual(expectedResult)
  })
})
