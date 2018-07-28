import moment from 'moment-es6'
import { StorageKey, initializeDatabase, add, update, exists } from './helper'

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(StorageKey))
}

describe('Helper tests', function() {
  beforeEach(function() {
    localStorage.clear()
    initializeDatabase()
  })

  it('should initialize the database with an empty record set', function() {
    var result = {
      records: []
    }

    expect(getFromLocalStorage().records).toHaveLength(0)
    expect(getFromLocalStorage()).toEqual(result)
  })

  it('should add a new fast', function() {
    var started = moment().format()
    var result = {
      records: [{ started }]
    }

    add(started)

    expect(getFromLocalStorage().records).toHaveLength(1)
    expect(getFromLocalStorage()).toEqual(result)
  })

  it('should stop the latest fast', function() {
    var started = moment().format()
    var stopped = moment()
      .add(1, 'year')
      .format()

    add(started)

    expect(getFromLocalStorage().records).toHaveLength(1)
    expect(getFromLocalStorage()).toEqual({
      records: [{ started }]
    })

    update(started, { stopped })

    expect(getFromLocalStorage().records).toHaveLength(1)
    expect(getFromLocalStorage()).toEqual({
      records: [{ started, stopped }]
    })
  })

  it('started should exist', function() {
    var started = moment().format()

    add(started)

    var doesExist = exists(started)
    expect(doesExist).toBeTruthy()
  })

  it('started should not exist', function() {
    var started = moment().format()
    var doesExist = exists(started)
    expect(doesExist).toBeFalsy()
  })

  it('should contain multiple fasts', function() {
    var firstStarted = moment().format()
    var firstStopped = moment()
      .add(1, 'year')
      .format()

    add(firstStarted)
    update(firstStarted, { stopped: firstStopped })

    expect(getFromLocalStorage().records).toHaveLength(1)
    expect(getFromLocalStorage()).toEqual({
      records: [{ started: firstStarted, stopped: firstStopped }]
    })

    var secondStarted = moment()
      .add(2, 'year')
      .format()

    var secondStopped = moment()
      .add(3, 'year')
      .format()

    add(secondStarted)
    update(secondStarted, { stopped: secondStopped })

    expect(getFromLocalStorage().records).toHaveLength(2)
    expect(getFromLocalStorage()).toEqual({
      records: [
        { started: firstStarted, stopped: firstStopped },
        { started: secondStarted, stopped: secondStopped }
      ]
    })
  })
})
