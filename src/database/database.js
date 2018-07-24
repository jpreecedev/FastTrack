import { DatabaseName, StoreName } from './index'

var db
var isBooting = true

async function waitForBootComplete() {
  var callCount = 0
  return new Promise(function(resolve, reject) {
    if (!isBooting) {
      resolve()
      return
    }

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

export function initializeDatabase() {
  window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

  var request = window.indexedDB.open(DatabaseName, 1)

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
    var objectStore = db.createObjectStore(StoreName, {
      keyPath: 'started'
    })
    objectStore.createIndex('started', 'started', { unique: true })
    objectStore.transaction.oncomplete = function oncomplete() {
      isBooting = false
    }
  }
}

export async function addRecord(store, record) {
  await waitForBootComplete()
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

export async function exists(store, id) {
  await waitForBootComplete()
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

export async function getAll(store) {
  await waitForBootComplete()

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

export async function getLast(store, index) {
  await waitForBootComplete()
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

export async function update(store, id, data) {
  await waitForBootComplete()
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
