import {take, put, select, call} from 'redux-saga/effects'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit,stopSubmit} from 'redux-form'
import {message, notification} from 'antd';
import config from 'utils/config'


//-----------------------------
// Constants
// ------------------------------------
export const Test1_FETCH_REQUESTED = 'Test1_FETCH_REQUESTED'
export const Test1_FETCH_SUCCESSED = 'Test1_FETCH_SUCCESSED'
export const Test1_FETCH_FAILURE = 'Test1_FETCH_FAILURE'


// -------

// ------------------------------------
// Actions
// ------------------------------------

export function fetchTest1() {
  return {
  type: Test1_FETCH_REQUESTED
  }
  }

export const actions = {
  fetchTest1,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [Test1_FETCH_REQUESTED]: (state) => state.setIn(['isFetching'], true),
  [Test1_FETCH_SUCCESSED]: (state, payload) => state.setIn(['isFetching'], false),
  [Test1_FETCH_FAILURE]: (state, action) => state.setIn(['isFetching'], false),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  isFetching: false,
  list: Immutable.fromJS([{key: '001'},]),
})
export default function test1Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------
export function *watchFetchTest1() {
  while (true) {

  yield take(Test1_FETCH_REQUESTED)
  // let {data, err} = yield call(asyncWait)
  // if (!err)

  yield put({type: 'Test1_FETCH_SUCCESSED'})
  // else {
    //
    //   yield put({type: 'Test1_FETCH_FAILURE', error: err.toString()})
    // }
  }
  }


export const sagas = [
watchFetchTest1,
]
