import {
  default as companyInfoReducer
} from 'routes/CompanyInfo/modules/companyInfo'

describe('(Redux Module) CompanyInfo', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(companyInfoReducer).to.be.a('function')
    })
  })
})


