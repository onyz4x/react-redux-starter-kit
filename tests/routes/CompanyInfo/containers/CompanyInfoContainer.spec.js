import React from 'react'
import { CompanyInfoContainer } from 'routes/CompanyInfo/containers/CompanyInfoContainer'
import { render } from 'enzyme'

describe('(View) CompanyInfo', () => {
  let _component

  beforeEach(() => {
    _component = render(<CompanyInfoContainer />)
  })

  it('Component exist', () => {
    expect(_component).to.exist
  })
})
