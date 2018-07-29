import React from 'react'
import { mount } from 'enzyme'

import Shell from './index'
import Loading from '../Loading'
import Banner from '../Banner'
import Home from '../../pages/Home'
import { getLastRecord } from '../../database'

jest.mock('../../database')

function renderComponent(props) {
  return mount(<Shell {...props} />)
}

describe('<Shell /> tests', function() {
  it('should render the app', function() {
    getLastRecord.mockImplementation(function() {
      return {}
    })

    var wrapper = renderComponent()
    var heading = wrapper.find('h1')

    expect(heading).toHaveLength(1)
    expect(heading.text()).toBe('Fast Track')
    expect(wrapper.find(Loading)).toHaveLength(0)
    expect(wrapper.find(Home)).toHaveLength(0)
    expect(wrapper.find(Banner)).toHaveLength(1)
  })

  it('should show the loading spinner when Loading=true', function() {
    getLastRecord.mockImplementation(function() {
      return {}
    })

    var wrapper = renderComponent()
    wrapper.setState({
      loading: true
    })

    expect(wrapper.find('h1')).toHaveLength(1)
    expect(wrapper.find(Loading)).toHaveLength(1)
    expect(wrapper.find(Banner)).toHaveLength(1)
    expect(wrapper.find(Home)).toHaveLength(0)
  })
})
