import React from 'react'
import { Test2Container } from 'routes/Test2/containers/Test2Container'
import { render } from 'enzyme'

describe('(View) Test2', () => {
  let _component

  beforeEach(() => {
    _component = render(<Test2Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
