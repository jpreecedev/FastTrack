import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment-es6'

import Duration from './index'

var defaultContext = {
  hasStarted: false,
  started: null,
  current: null
}

function renderComponent(props, context) {
  var outer = shallow(<Duration {...props} />)
  var Children = outer.props().children({ ...defaultContext, ...context })
  return shallow(Children)
}

describe('<Duration /> tests', function() {
  it('should show the start fasting prompt', function() {
    var wrapper = renderComponent()

    expect(wrapper.find('h2').text()).toBe('Start fasting now!')
  })

  it('should say the fast has been in progress for 1 year', function() {
    var started = moment()
    var current = moment().add(1, 'year')

    var wrapper = renderComponent(
      {},
      {
        hasStarted: true,
        started,
        current
      }
    )

    expect(wrapper.find('h2').text()).toBe('a year ago')
  })
})
