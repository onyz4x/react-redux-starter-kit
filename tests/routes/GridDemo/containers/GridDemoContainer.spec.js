import React from 'react'
import { GridDemoContainer } from 'routes/GridDemo/containers/GridDemoContainer'
import { render } from 'enzyme'

describe('(View) GridDemo', () => {
  let _component

  beforeEach(() => {
    _component = render(<GridDemoContainer />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
