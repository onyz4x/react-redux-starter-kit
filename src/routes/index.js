// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import IframeLayout from '../layouts/IframeLayout/IframeLayout'
import Home from './Home'
import CounterRoute from './Counter'
import FormDemoRoute from './FormDemo'
import Test1Route from './Test1'
import CompanyInfo from './Setting/CompanyInfo'

import Test2Route from './Test2'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: IframeLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    FormDemoRoute(store),
    Test1Route(store),
    Test2Route(store),
    CompanyInfo(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
