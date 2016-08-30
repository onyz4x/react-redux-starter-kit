import Griddemo2Route from 'routes/Griddemo2'

describe('(Route) Griddemo2', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo2Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo2`', () => {
    expect(_route.path).to.equal('griddemo2')
  })

})
