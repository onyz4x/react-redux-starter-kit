import Griddemo/demo1Route from 'routes/Griddemo/demo1'

describe('(Route) Griddemo/demo1', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo/demo1Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo/demo1`', () => {
    expect(_route.path).to.equal('griddemo/demo1')
  })

})
