import Griddemo/demo2Route from 'routes/Griddemo/demo2'

describe('(Route) Griddemo/demo2', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo/demo2Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo/demo2`', () => {
    expect(_route.path).to.equal('griddemo/demo2')
  })

})
