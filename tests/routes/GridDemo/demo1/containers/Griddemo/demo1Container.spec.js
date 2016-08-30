import React from 'react'
import { Griddemo/demo1Container } from 'routes/Griddemo/demo1/containers/Griddemo/demo1Container'
import { render } from 'enzyme'

describe('(View) Griddemo/demo1', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo/demo1Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
