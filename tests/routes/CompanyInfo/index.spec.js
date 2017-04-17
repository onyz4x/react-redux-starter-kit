import CompanyInfoRoute from 'routes/CompanyInfo'

describe('(Route) CompanyInfo', () => {
  let _route

  beforeEach(() => {
    _route = CompanyInfoRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `companyInfo`', () => {
    expect(_route.path).to.equal('companyInfo')
  })

})
