import React from 'react'
import { Griddemo/demo3Container } from 'routes/Griddemo/demo3/containers/Griddemo/demo3Container'
import { render } from 'enzyme'

describe('(View) Griddemo/demo3', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo/demo3Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
