import {take, put, select, call} from 'redux-saga/effects'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit,stopSubmit} from 'redux-form'
import {message, notification} from 'antd';
import config from 'utils/config'


//-----------------------------
// Constants
// ------------------------------------
export const Page_FETCH_REQUESTED = 'Page_FETCH_REQUESTED'
export const Page_FETCH_SUCCESSED = 'Page_FETCH_SUCCESSED'
export const Page_FETCH_FAILURE = 'Page_FETCH_FAILURE'


// -------

// ------------------------------------
// Actions
// ------------------------------------

export function fetchPage() {
  return {
  type: Page_FETCH_REQUESTED
  }
  }

export const actions = {
  fetchPage,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [Page_FETCH_REQUESTED]: (state) => state.setIn(['isFetching'], true),
  [Page_FETCH_SUCCESSED]: (state, payload) => state.setIn(['isFetching'], false),
  [Page_FETCH_FAILURE]: (state, action) => state.setIn(['isFetching'], false),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  isFetching: false,
  list: Immutable.fromJS([{key: '001'},]),
})
export default function pageReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------
export function *watchFetchPage() {
  while (true) {

  yield take(Page_FETCH_REQUESTED)
  // let {data, err} = yield call(asyncWait)
  // if (!err)

  yield put({type: 'Page_FETCH_SUCCESSED'})
  // else {
    //
    //   yield put({type: 'Page_FETCH_FAILURE', error: err.toString()})
    // }
  }
  }


export const sagas = [
watchFetchPage,
]
