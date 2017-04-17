import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'test2',
  breadcrumbName:'Test2',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/Test2Container',
      './modules/test2'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const test2 = require('./containers/Test2Container').default
      const reducer = require('./modules/test2').default
      const sagas = require('./modules/test2').sagas
      /*  Add the reducer to the store on key 'test2'  */
      injectReducer(store, { key: 'test2', reducer })
      injectSagas(store, { key: 'test2', sagas })
      /*  Return getComponent   */
      cb(null, test2)

    /* Webpack named bundle   */
    }, 'test2')
  }
})
