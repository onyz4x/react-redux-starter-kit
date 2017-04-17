import {
  default as test2Reducer
} from 'routes/Test2/modules/test2'

describe('(Redux Module) Test2', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(test2Reducer).to.be.a('function')
    })
  })
})


