import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'griddemo3',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/Griddemo3Container',
      './modules/griddemo3'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const griddemo3 = require('./containers/Griddemo3Container').default
      const reducer = require('./modules/griddemo3').default
      const sagas = require('./modules/griddemo3').sagas
      /*  Add the reducer to the store on key 'griddemo3'  */
      injectReducer(store, { key: 'griddemo3', reducer })
      injectSagas(store, { key: 'griddemo3', sagas })
      /*  Return getComponent   */
      cb(null, griddemo3)

    /* Webpack named bundle   */
    }, 'griddemo3')
  }
})
