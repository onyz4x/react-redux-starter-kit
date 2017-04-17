import Test2Route from 'routes/Test2'

describe('(Route) Test2', () => {
  let _route

  beforeEach(() => {
    _route = Test2Route({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `test2`', () => {
    expect(_route.path).to.equal('test2')
  })

})
