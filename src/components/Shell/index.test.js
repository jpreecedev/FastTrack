import React from 'react'
import { shallow } from 'enzyme'

import Shell from './index'

function renderComponent(props) {
  return shallow(<Shell {...props} />)
}

describe('<Shell /> tests', function() {
  // var wrapper = renderComponent()
  // console.log(wrapper.debug())
})
