/**
|--------------------------------------------------
| Enzyme
|--------------------------------------------------
*/

import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import jsdom from 'jsdom'
import { IDBFactory, IDBKeyRange, reset } from 'shelving-mock-indexeddb'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount

/**
|--------------------------------------------------
| JSDOM
|--------------------------------------------------
*/

const { JSDOM } = jsdom

var dom = new JSDOM('<!doctype html><html><body></body></html>')

global.document = dom
global.window = dom.window
global.navigator = dom.window.navigator

/**
|--------------------------------------------------
| IndexedDB
|--------------------------------------------------
*/

// Reset the IndexedDB mock before/after tests.
// This will clear all object stores, indexes, and data.
beforeEach(() => reset())
afterEach(() => reset())

// The IndexedDB mock uses setTimeout() to simulate the asyncronous API.
// Add fake timers before/after tests to ensure the asyncronous responses are received by the test.
beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.runAllTimers())

global.window.indexedDB = new IDBFactory()
global.IDBKeyRange = IDBKeyRange
