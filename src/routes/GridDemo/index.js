import {injectReducer} from 'store/reducers'
import {injectSagas} from 'store/sagas'

export default(store) => ({
  path: 'GridDemo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/GridDemoContainer', './modules/GridDemo'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const GridDemo = require('./containers/GridDemoContainer').default
      const reducer = require('./modules/GridDemo').default
      const sagas = require('./modules/GridDemo').sagas
      /*  Add the reducer to the store on key 'GridDemo'  */
      injectReducer(store, {
        key: 'GridDemo',
        reducer
      })
      injectSagas(store, {
        key: 'GridDemo',
        sagas
      })
      /*  Return getComponent   */
      cb(null, GridDemo)

      /* Webpack named bundle   */
    }, 'GridDemo')
  }
})
