import FormDemoRoute from 'routes/FormDemo'

describe('(Route) FormDemo', () => {
  let _route

  beforeEach(() => {
    _route = FormDemoRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `FormDemo`', () => {
    expect(_route.path).to.equal('FormDemo')
  })

})
