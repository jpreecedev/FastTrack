import { StorageKey, initializeDatabase } from '.'

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(StorageKey))
}

function setItemInLocalStorage(item) {
  localStorage.setItem(StorageKey, JSON.stringify(item))
}

describe('Database tests', function() {
  it('should be true', function() {
    expect(true).toBe(true)
  })
})
