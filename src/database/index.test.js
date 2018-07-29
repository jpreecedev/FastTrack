import moment from 'moment-es6'

import {
  startFast,
  stopFast,
  getFastDuration,
  getHistory,
  getLastRecord,
  isFastInProgress,
  hasFastStopped
} from './index'
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

    startFast(started)

    expect(add).toHaveBeenCalledTimes(1)
    expect(add).toHaveBeenCalledWith(started)
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

  it('should return an empty record when there are no records when calling getLast', function() {
    var expectedResult = {}

    getLast.mockImplementation(function() {
      return expectedResult
    })

    var result = getLastRecord()

    expect(result).toEqual(expectedResult)
  })

  it('should return the last record when there is only one record', function() {
    var started = moment().format()
    var expectedResult = {
      started
    }

    getLast.mockImplementation(function() {
      return expectedResult
    })

    var result = getLastRecord()

    expect(result).toEqual(expectedResult)
  })

  it('fast should not be in progress when record set is empty', function() {
    var expectedResult = false

    getLast.mockImplementation(function() {
      return {}
    })

    var result = isFastInProgress()

    expect(result).toEqual(expectedResult)
  })

  it('fast should be in progress when single record is started', function() {
    var expectedResult = true
    var data = {
      started: moment().format()
    }

    getLast.mockImplementation(function() {
      return data
    })

    var result = isFastInProgress()

    expect(result).toEqual(expectedResult)
  })

  it('should correctly identify that the fast has stopped', function() {
    var expectedResult = true
    var data = {
      started: moment().format(),
      stopped: moment()
        .add(1, 'year')
        .format()
    }

    var result = hasFastStopped(data)

    expect(result).toEqual(expectedResult)
  })

  it('should correctly identify that the fast has not stopped', function() {
    var expectedResult = false
    var data = {
      started: moment().format()
    }

    var result = hasFastStopped(data)

    expect(result).toEqual(expectedResult)
  })
})
