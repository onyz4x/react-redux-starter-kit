import {take, put, select, call} from 'redux-saga/effects'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit,stopSubmit} from 'redux-form'
import {message, notification} from 'antd';
import config from 'utils/config'


//-----------------------------
// Constants
// ------------------------------------
export const CompanyInfo_FETCH_REQUESTED = 'CompanyInfo_FETCH_REQUESTED'
export const CompanyInfo_FETCH_SUCCESSED = 'CompanyInfo_FETCH_SUCCESSED'
export const CompanyInfo_FETCH_FAILURE = 'CompanyInfo_FETCH_FAILURE'


// -------

// ------------------------------------
// Actions
// ------------------------------------

export function fetchCompanyInfo() {
  return {
  type: CompanyInfo_FETCH_REQUESTED
  }
  }

export const actions = {
  fetchCompanyInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [CompanyInfo_FETCH_REQUESTED]: (state) => state.setIn(['isFetching'], true),
  [CompanyInfo_FETCH_SUCCESSED]: (state, payload) => state.setIn(['isFetching'], false),
  [CompanyInfo_FETCH_FAILURE]: (state, action) => state.setIn(['isFetching'], false),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  isFetching: false,
  list: Immutable.fromJS([{key: '001'},]),
})
export default function companyInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------
export function *watchFetchCompanyInfo() {
  while (true) {

  yield take(CompanyInfo_FETCH_REQUESTED)
  // let {data, err} = yield call(asyncWait)
  // if (!err)

  yield put({type: 'CompanyInfo_FETCH_SUCCESSED'})
  // else {
    //
    //   yield put({type: 'CompanyInfo_FETCH_FAILURE', error: err.toString()})
    // }
  }
  }


export const sagas = [
watchFetchCompanyInfo,
]
