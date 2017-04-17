import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'test1',
  breadcrumbName:'Test1',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/Test1Container',
      './modules/test1'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const test1 = require('./containers/Test1Container').default
      const reducer = require('./modules/test1').default
      const sagas = require('./modules/test1').sagas
      /*  Add the reducer to the store on key 'test1'  */
      injectReducer(store, { key: 'test1', reducer })
      injectSagas(store, { key: 'test1', sagas })
      /*  Return getComponent   */
      cb(null, test1)

    /* Webpack named bundle   */
    }, 'test1')
  }
})
