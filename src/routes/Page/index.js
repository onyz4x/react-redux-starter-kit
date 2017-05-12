import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'page/:id(/:s)',
  breadcrumbName:'Page',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/PageContainer',
      './modules/page'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const page = require('./containers/PageContainer').default
      const reducer = require('./modules/page').default
      const sagas = require('./modules/page').sagas
      /*  Add the reducer to the store on key 'page'  */
      injectReducer(store, { key: 'page', reducer })
      injectSagas(store, { key: 'page', sagas })
      /*  Return getComponent   */
      cb(null, page)

    /* Webpack named bundle   */
    }, 'page')
  }
})
