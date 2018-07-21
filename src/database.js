import moment from 'moment-es6'

window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

var db
var request = window.indexedDB.open('FastTrack', 1)
var isBooting = true

request.onsuccess = function onsuccess(event) {
  db = event.target.result

  db.onerror = function(event) {
    alert('Database error: ' + event.target.errorCode)
  }

  isBooting = false
}

request.onerror = function onerror(event) {
  console.error(event.target.error)
  isBooting = false
}

request.onupgradeneeded = function(event) {
  db = event.target.result
  var objectStore = db.createObjectStore('fastingHistory', {
    keyPath: 'id',
    autoIncrement: true
  })
  objectStore.createIndex('id', 'id', { unique: true })
  objectStore.transaction.oncomplete = function oncomplete() {
    isBooting = false
  }
}

var waitForBootComplete = async function() {
  var callCount = 0
  return new Promise(function(resolve, reject) {
    var interval = setInterval(function() {
      if (!isBooting) {
        clearInterval(interval)
        resolve()
      } else {
        callCount += 1
        if (callCount === 10) {
          reject(new Error('IndexedDb has failed'))
        }
      }
    }, 300)
  })
}

export async function getFastingHistory() {
  return new Promise(async function(resolve, reject) {
    await waitForBootComplete()

    var transaction = db.transaction(['fastingHistory'])
    var objectStore = transaction.objectStore('fastingHistory')
    var request = objectStore.getAll()
    request.onerror = function(event) {
      reject(event.target.error)
    }
    request.onsuccess = function(event) {
      resolve(event.target.result)
    }
  })
}

export async function startFast(started) {
  return new Promise(function(resolve, reject) {
    var transaction = db.transaction(['fastingHistory'], 'readwrite')
    var objectStore = transaction.objectStore('fastingHistory')
    var request = objectStore.add({
      started: moment(started).format()
    })
    request.onsuccess = function onsuccess(event) {
      resolve()
    }
    request.onerror = function onerror(event) {
      reject(event)
    }
  })
}

export async function stopFast(stopped) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction(['fastingHistory'], 'readwrite')
    var objectStore = transaction.objectStore('fastingHistory')
    var index = objectStore.index('id')
    var openCursorRequest = index.openCursor(null, 'prev')

    openCursorRequest.onsuccess = function onsuccess(event) {
      var record = event.target.result.value
      var requestUpdate = objectStore.put({
        ...record,
        stopped: moment(stopped).format()
      })
      requestUpdate.onsuccess = function onsuccess(event) {
        resolve()
      }
      requestUpdate.onerror = function onerror(event) {
        reject(event)
      }
    }

    openCursorRequest.onerror = function onerror(event) {
      reject(event)
    }
  })
}
