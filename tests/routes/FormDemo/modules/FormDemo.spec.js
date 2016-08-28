import {
  default as formDemoReducer
} from 'routes/FormDemo/modules/FormDemo'

describe('(Redux Module) FormDemo', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(formDemoReducer).to.be.a('function')
    })
  })
})


