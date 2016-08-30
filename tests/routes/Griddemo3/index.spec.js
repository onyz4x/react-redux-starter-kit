import Griddemo3Route from 'routes/Griddemo3'

describe('(Route) Griddemo3', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo3Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo3`', () => {
    expect(_route.path).to.equal('griddemo3')
  })

})
