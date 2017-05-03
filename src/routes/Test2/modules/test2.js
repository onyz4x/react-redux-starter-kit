import {take, put, select, call} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit, stopSubmit} from 'redux-form'
import {message, notification} from 'antd';
import config from 'utils/config'


//-----------------------------
// Constants
// ------------------------------------
export const Test2_FETCH_REQUESTED = '/Test2/Test2_FETCH_REQUESTED'
export const Test2_FETCH_SUCCESSED = 'Test2_FETCH_SUCCESSED'
export const Test2_FETCH_FAILURE = 'Test2_FETCH_FAILURE'


// -------

// ------------------------------------
// Actions
// ------------------------------------

export function fetchTest2() {
  return {
    type: Test2_FETCH_REQUESTED
  }
}

export const actions = {
  fetchTest2,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [Test2_FETCH_REQUESTED]: (state) => state.setIn(['isFetching'], true),
  [Test2_FETCH_SUCCESSED]: (state, payload) => state.setIn(['isFetching'], false),
  [Test2_FETCH_FAILURE]: (state, action) => state.setIn(['isFetching'], false),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  isFetching: false,
  list: Immutable.fromJS([{key: '001'},]),
})
export default function test2Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------
export function *watchFetchTest2() {
  while (true) {

    yield take(Test2_FETCH_REQUESTED)
    // let {data, err} = yield call(asyncWait)
    // if (!err)


    yield delay(2000)

    let data={result:"123"};


    yield put({type: Test2_FETCH_SUCCESSED,data})
    // else {
    //
    //   yield put({type: 'Test2_FETCH_FAILURE', error: err.toString()})
    // }
  }
}


export const sagas = [
  watchFetchTest2,
]
