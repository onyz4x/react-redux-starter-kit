import React from 'react'
import { Griddemo1Container } from 'routes/Griddemo1/containers/Griddemo1Container'
import { render } from 'enzyme'

describe('(View) Griddemo1', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo1Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
