import {take, put, select, call} from 'redux-saga/effects'
import i18n from 'i18next';
import {history} from '../main'
import PubSub from 'pubsub-js'


// ------------------------------------
// PubSub
// ------------------------------------
PubSub.subscribe("navigator.push", (msg, data) => {
  const {url, query, ...others} = data;
  history.push({
    pathname: url,
    search: query,
    state: others
  });
})

PubSub.subscribe("navigator.goBack", (msg, data) => {
  history.goBack();
})

PubSub.subscribe("navigator.replace", (msg, data) => {
  const {url, query, ...others} = data;
  history.replace({
    pathname: url,
    search: query,
    state: others
  });
})
// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'


export function changeLanguage(value) {
  return {
    type: CHANGE_LANGUAGE,
    payload: value
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {changeLanguage}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_LANGUAGE]: (state) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  aa: '11'
}
export default function globalReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------

export function* changeLanguageAsync() {
  while (true) {
    const {payload} = yield take(CHANGE_LANGUAGE)
    i18n.changeLanguage(payload, (err, t) => {
    });
  }
}

export const sagas = [
  changeLanguageAsync
]
