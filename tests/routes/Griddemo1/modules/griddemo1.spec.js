import {
  default as griddemo1Reducer
} from 'routes/Griddemo1/modules/griddemo1'

describe('(Redux Module) Griddemo1', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(griddemo1Reducer).to.be.a('function')
    })
  })
})


