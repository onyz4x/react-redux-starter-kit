import GridDemoRoute from 'routes/GridDemo'

describe('(Route) GridDemo', () => {
  let _route

  beforeEach(() => {
    _route = GridDemoRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `GridDemo`', () => {
    expect(_route.path).to.equal('GridDemo')
  })

})
