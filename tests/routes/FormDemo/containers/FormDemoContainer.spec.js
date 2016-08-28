import React from 'react'
import { FormDemoContainer } from 'routes/FormDemo/containers/FormDemoContainer'
import { render } from 'enzyme'

describe('(View) FormDemo', () => {
  let _component

  beforeEach(() => {
    _component = render(<FormDemoContainer />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
