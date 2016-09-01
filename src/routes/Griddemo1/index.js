import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/Griddemo1Container',
      './modules/griddemo1'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const griddemo1 = require('./containers/Griddemo1Container').default
      const reducer = require('./modules/griddemo1').default
      const sagas = require('./modules/griddemo1').sagas
      /*  Add the reducer to the store on key 'griddemo1'  */
      injectReducer(store, { key: 'griddemo1', reducer })
      injectSagas(store, { key: 'griddemo1', sagas })
      /*  Return getComponent   */
      cb(null, griddemo1)

    /* Webpack named bundle   */
    }, 'griddemo1')
  }
})
