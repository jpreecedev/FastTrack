import moment from 'moment-es6'
import { exists, update, addRecord } from './helper'

export const DefaultDisplayDateFormat = 'Do MMM'

export function startFast(started) {
  var formatted = moment(started).format()
  var newData = {
    started: formatted
  }

  if (exists(formatted)) {
    update(formatted, newData)
  } else {
    addRecord(newData)
  }
}

// export function updateFast(started) {
//   var formatted = moment(started).format()
//   var duration = moment.duration(moment().diff(started)).asMinutes()

//   var newData = {
//     duration: duration < 1 ? 1 : duration
//   }

//   if (dataExists) {
//     var updated = update(StoreName, formatted, newData)
//     newData = {
//       ...newData,
//       ...updated
//     }
//   } else {
//     reject(new Error('Record not found'))
//   }
// }

// function parseExistingDataStructure(fastingData) {
//   if (fastingData.length === 0) {
//     return DefaultDataStructure
//   }

//   var data = fastingData.map(item => {
//     var started = moment(item.started)
//     var stopped = item.stopped ? moment(item.stopped) : moment()
//     var duration = moment.duration(stopped.diff(started)).asMinutes()

//     return {
//       started: item.started,
//       stopped: item.stopped ? moment(item.stopped) : undefined,
//       duration,
//       label: moment(item.started).format(DefaultDisplayDateFormat)
//     }
//   })

//   return {
//     labels: data.map(item => item.label),
//     data
//   }
// }

// export function toChartDataFormat(fastingData, dataset) {
//   if (!fastingData) {
//     return dataset
//   }
//   if (!dataset) {
//     throw new Error('Dataset is required')
//   }

//   var existingLabel = dataset.data.find(x => x.label === fastingData.label)
//   if (!existingLabel) {
//     dataset.labels.push(fastingData.label)
//     dataset.data.push(fastingData)
//   } else {
//     existingLabel.duration = fastingData.duration
//     existingLabel.started = fastingData.started
//     existingLabel.stopped = fastingData.stopped
//   }
//   return dataset
// }

// export async function getFastingHistory() {
//   return new Promise(async function(resolve, reject) {
//     try {
//       var result = parseExistingDataStructure(await getAll(StoreName))
//       resolve(result)
//     } catch (err) {
//       reject(new Error(err))
//     }
//   })
// }

// export async function stopFast(stopped) {
//   return new Promise(async function(resolve, reject) {
//     try {
//       var last = await getLast(StoreName, 'started')
//       var updated = {
//         ...last,
//         stopped: stopped.format()
//       }

//       await update(StoreName, last.started, updated)

//       resolve(updated)
//     } catch (err) {
//       reject(new Error(err))
//     }
//   })
// }

// initializeDatabase()
