import moment from 'moment-es6'
import {
  getAll,
  getLast,
  addRecord,
  exists,
  update,
  waitForBootComplete
} from './database'

export const DatabaseName = 'fastingHistory'
export const StoreName = 'fastingHistory'

export const DefaultDataStructure = {
  labels: [],
  data: []
}
export const DefaultDisplayDateFormat = 'Do MMM'

function parseExistingDataStructure(fastingData) {
  if (fastingData.length === 0) {
    return DefaultDataStructure
  }

  var data = fastingData.map(item => {
    var started = moment(item.started)
    var stopped = item.stopped ? moment(item.stopped) : moment()
    var duration = moment.duration(stopped.diff(started)).asMinutes()

    return {
      started: item.started,
      stopped: item.stopped ? moment(item.stopped) : undefined,
      duration,
      label: moment(item.started).format(DefaultDisplayDateFormat)
    }
  })

  return {
    labels: data.map(item => item.label),
    data
  }
}

export function toChartDataFormat(fastingData, dataset) {
  var existingLabel = dataset.data.find(x => x.label === fastingData.label)
  if (!existingLabel) {
    dataset.labels.push(fastingData.label)
  }
  dataset.data.push(fastingData)
  return dataset
}

export async function getFastingHistory() {
  return new Promise(async function(resolve, reject) {
    await waitForBootComplete()

    try {
      var result = parseExistingDataStructure(await getAll(StoreName))
      resolve(result)
    } catch (err) {
      reject(new Error(err))
    }
  })
}

export async function startFast(started) {
  return new Promise(async function(resolve, reject) {
    try {
      var dataExists = await exists(StoreName, started.format(DefaultDisplayDateFormat))
      var formatted = moment(started).format()
      var newData = {
        started: formatted,
        label: started.format(DefaultDisplayDateFormat),
        duration: 1
      }

      if (dataExists) {
        var updated = await update(StoreName, formatted)
        newData = {
          ...newData,
          ...updated
        }
      } else {
        await addRecord(StoreName, newData)
      }

      resolve(newData)
    } catch (err) {
      reject(new Error(err))
    }
  })
}

export async function updateFast(started) {
  return new Promise(async function(resolve, reject) {
    try {
      var dataExists = await exists(StoreName, started.format())
      var formatted = moment(started).format()
      var duration = moment.duration(moment().diff(started)).asMinutes()

      var newData = {
        duration: duration < 1 ? 1 : duration
      }

      if (dataExists) {
        var updated = await update(StoreName, formatted, newData)
        newData = {
          ...newData,
          ...updated
        }
      } else {
        reject(new Error('Record not found'))
      }

      resolve(newData)
    } catch (err) {
      reject(new Error(err))
    }
  })
}

export async function stopFast(stopped) {
  return new Promise(async function(resolve, reject) {
    try {
      var last = await getLast(StoreName, 'started')
      var updated = {
        ...last,
        stopped: stopped.format()
      }

      await update(StoreName, last.started, updated)

      resolve(updated)
    } catch (err) {
      reject(new Error(err))
    }
  })
}
