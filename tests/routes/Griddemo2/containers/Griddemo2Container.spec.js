import React from 'react'
import { Griddemo2Container } from 'routes/Griddemo2/containers/Griddemo2Container'
import { render } from 'enzyme'

describe('(View) Griddemo2', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo2Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
