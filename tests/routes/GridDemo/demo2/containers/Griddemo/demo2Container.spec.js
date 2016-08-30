import React from 'react'
import { Griddemo/demo2Container } from 'routes/Griddemo/demo2/containers/Griddemo/demo2Container'
import { render } from 'enzyme'

describe('(View) Griddemo/demo2', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo/demo2Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
