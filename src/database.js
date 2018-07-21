import { DatabaseName } from './data-helper'

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
    keyPath: 'started'
  })
  objectStore.createIndex('started', 'started', { unique: true })
  objectStore.transaction.oncomplete = function oncomplete() {
    isBooting = false
  }
}

export async function waitForBootComplete() {
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

export function addRecord(store, record) {
  return new Promise(function(resolve, reject) {
    var transaction = db.transaction([DatabaseName], 'readwrite')
    var objectStore = transaction.objectStore(store)
    var request = objectStore.add(record)
    request.onsuccess = function onsuccess() {
      resolve()
    }
    request.onerror = function onerror(event) {
      reject(event)
    }
  })
}

export function exists(store, id) {
  return new Promise(function(resolve, reject) {
    var transaction = db.transaction([DatabaseName], 'readwrite')
    var objectStore = transaction.objectStore(store)
    var request = objectStore.get(id)
    request.onsuccess = function onsuccess(event) {
      resolve(typeof event.target.result !== 'undefined')
    }
    request.onerror = function onerror(event) {
      reject(event)
    }
  })
}

export function getAll(store) {
  return new Promise(function(resolve, reject) {
    var transaction = db.transaction([DatabaseName], 'readwrite')
    var objectStore = transaction.objectStore(store)
    var request = objectStore.getAll()
    request.onsuccess = function onsuccess(event) {
      resolve(event.target.result)
    }
    request.onerror = function onerror(event) {
      reject(event)
    }
  })
}

export function getLast(store, index) {
  return new Promise(function(resolve, reject) {
    var transaction = db.transaction([DatabaseName], 'readwrite')
    var objectStore = transaction.objectStore(store)
    var storeIndex = objectStore.index(index)
    var openCursorRequest = storeIndex.openCursor(null, 'prev')

    openCursorRequest.onsuccess = function onsuccess(event) {
      resolve(event.target.result.value)
    }

    openCursorRequest.onerror = function onerror(event) {
      reject(event)
    }
  })
}

export function update(store, id, data) {
  return new Promise(function(resolve, reject) {
    var objectStore = db.transaction([DatabaseName], 'readwrite').objectStore(store)
    var request = objectStore.get(id)
    request.onsuccess = function(event) {
      var newData = {
        ...event.target.result,
        ...data
      }
      var requestUpdate = objectStore.put(newData)

      requestUpdate.onsuccess = function() {
        resolve(newData)
      }

      requestUpdate.onerror = function(event) {
        reject(new Error(event))
      }
    }
  })
}
