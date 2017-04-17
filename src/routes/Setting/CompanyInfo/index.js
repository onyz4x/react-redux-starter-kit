import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'companyInfo',
  breadcrumbName:'CompanyInfo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/CompanyInfoContainer',
      './modules/companyInfo'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const companyInfo = require('./containers/CompanyInfoContainer').default
      const reducer = require('./modules/companyInfo').default
      const sagas = require('./modules/companyInfo').sagas
      /*  Add the reducer to the store on key 'companyInfo'  */
      injectReducer(store, { key: 'companyInfo', reducer })
      injectSagas(store, { key: 'companyInfo', sagas })
      /*  Return getComponent   */
      cb(null, companyInfo)

    /* Webpack named bundle   */
    }, 'companyInfo')
  }
})
