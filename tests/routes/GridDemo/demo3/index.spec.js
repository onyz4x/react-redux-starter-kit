import Griddemo/demo3Route from 'routes/Griddemo/demo3'

describe('(Route) Griddemo/demo3', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo/demo3Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo/demo3`', () => {
    expect(_route.path).to.equal('griddemo/demo3')
  })

})
