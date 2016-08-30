import React from 'react'
import { Griddemo/griddemo3Container } from 'routes/Griddemo/griddemo3/containers/Griddemo/griddemo3Container'
import { render } from 'enzyme'

describe('(View) Griddemo/griddemo3', () => {
  let _component

  beforeEach(() => {
    _component = render(<Griddemo/griddemo3Container />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
