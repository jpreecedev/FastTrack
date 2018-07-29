export const StorageKey = 'fast_track'

export const DefaultDataStructure = {
  records: []
}

export function initializeDatabase() {
  var data = localStorage.getItem(StorageKey)
  if (!data) {
    localStorage.setItem(StorageKey, JSON.stringify(DefaultDataStructure))
  }
}

export function add(started) {
  var data = JSON.parse(localStorage.getItem(StorageKey))
  data.records.push({ started })
  localStorage.setItem(StorageKey, JSON.stringify(data))
  return data
}

export function update(started, data) {
  var storageData = JSON.parse(localStorage.getItem(StorageKey))
  var recordIndex = storageData.records.findIndex(function(x) {
    return x.started === started
  })

  if (recordIndex > -1) {
    storageData.records[recordIndex] = {
      ...storageData.records[recordIndex],
      ...data
    }
    localStorage.setItem(StorageKey, JSON.stringify(storageData))
  }
}

export function exists(started) {
  var data = JSON.parse(localStorage.getItem(StorageKey))
  return data.records.find(function(x) {
    return x.started === started
  })
}

export function getLast() {
  var data = JSON.parse(localStorage.getItem(StorageKey))
  if (data.records.length) {
    return data.records[data.records.length - 1]
  }
  return {}
}

export function getAll() {
  return JSON.parse(localStorage.getItem(StorageKey))
}
