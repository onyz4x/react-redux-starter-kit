import React from 'react'
import { Griddemo3Container } from 'routes/Griddemo3/containers/Griddemo3Container'
import { render } from 'enzyme'

describe('(View) Griddemo3', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo3Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
