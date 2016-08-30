import Griddemo1Route from 'routes/Griddemo1'

describe('(Route) Griddemo1', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo1Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo1`', () => {
    expect(_route.path).to.equal('griddemo1')
  })

})
