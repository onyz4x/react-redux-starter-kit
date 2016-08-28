import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'FormDemo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/FormDemoContainer',
      './modules/FormDemo'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const formDemo = require('./containers/FormDemoContainer').default
      const reducer = require('./modules/FormDemo').default
      const sagas = require('./modules/FormDemo').sagas
      /*  Add the reducer to the store on key 'FormDemo'  */
      injectReducer(store, { key: 'FormDemo', reducer })
      injectSagas(store, { key: 'FormDemo', sagas })
      /*  Return getComponent   */
      cb(null, formDemo)

    /* Webpack named bundle   */
    }, 'FormDemo')
  }
})
