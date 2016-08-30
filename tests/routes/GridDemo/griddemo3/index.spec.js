import Griddemo/griddemo3Route from 'routes/Griddemo/griddemo3'

describe('(Route) Griddemo/griddemo3', () => {
  let _route

  beforeEach(() => {
    _route = Griddemo/griddemo3Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `griddemo/griddemo3`', () => {
    expect(_route.path).to.equal('griddemo/griddemo3')
  })

})
