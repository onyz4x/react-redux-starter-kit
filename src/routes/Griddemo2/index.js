import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'griddemo2',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/Griddemo2Container',
      './modules/griddemo2'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const griddemo2 = require('./containers/Griddemo2Container').default
      const reducer = require('./modules/griddemo2').default
      const sagas = require('./modules/griddemo2').sagas
      /*  Add the reducer to the store on key 'griddemo2'  */
      injectReducer(store, { key: 'griddemo2', reducer })
      injectSagas(store, { key: 'griddemo2', sagas })
      /*  Return getComponent   */
      cb(null, griddemo2)

    /* Webpack named bundle   */
    }, 'griddemo2')
  }
})
