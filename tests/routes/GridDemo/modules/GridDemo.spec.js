import {
  default as gridDemoReducer
} from 'routes/GridDemo/modules/GridDemo'

describe('(Redux Module) GridDemo', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(gridDemoReducer).to.be.a('function')
    })
  })
})


