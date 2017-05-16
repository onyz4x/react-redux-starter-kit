import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {useRouterHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'


import {I18nextProvider} from 'react-i18next';
// as we build ourself via webpack
import i18n from './i18n';
import moment from 'moment'

template.defaults.imports.dateFormat = function (date, format) {
  if (date != undefined)
    return moment(date).format(format)
};

template.defaults.imports.log = console.log;

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
export const store = createStore(initialState, browserHistory)
export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}
var resBundle = require(
  "i18next-resource-store-loader!./locales/index.js"
);

i18n.init({
  resources: resBundle
});

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {


  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <I18nextProvider i18n={ i18n }><AppContainer
      store={store}
      history={history}
      routes={routes}
    /></I18nextProvider>,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
