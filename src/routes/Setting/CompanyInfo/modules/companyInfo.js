import {take, put, select, call} from 'redux-saga/effects'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit, stopSubmit} from 'redux-form'
import {message, notification} from 'antd';
import config from 'utils/config'


//-----------------------------
// Constants
// ------------------------------------
export const CompanyInfo_FETCH_REQUESTED = 'CompanyInfo_FETCH_REQUESTED'
export const CompanyInfo_FETCH_SUCCESSED = 'CompanyInfo_FETCH_SUCCESSED'
export const CompanyInfo_FETCH_FAILURE = 'CompanyInfo_FETCH_FAILURE'

export const LoginRequest = 'LoginRequest'


// -------

// ------------------------------------
// Actions
// ------------------------------------

export function fetchCompanyInfo() {
  return {
    type: CompanyInfo_FETCH_REQUESTED
  }
}

export function login() {
  return {
    type: LoginRequest
  }
}

export const actions = {
  fetchCompanyInfo,
  login
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
export default function companyInfoReducer(state = initialState, action) {
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
    let {data, err} = yield call(request,
      config.currentServer + `manager/authority/companyInfo/companyList?_search=false&nd=1492487511276&rows=20&page=1&sidx=&sord=asc`,
      {
        method: 'get',

      });//ignore token, avoid API 500 error);
    // https://www.phoneerp.com/manager/authority/companyInfo/companyList?_search=false&nd=1492487511276&rows=20&page=1&sidx=&sord=asc
    yield put({type: 'CompanyInfo_FETCH_SUCCESSED'})
    // else {
    //
    //   yield put({type: 'CompanyInfo_FETCH_FAILURE', error: err.toString()})
    // }
  }
}

export function *watchLoginRequest() {
  while (true) {

    yield take(LoginRequest)
    // let {data, err} = yield call(asyncWait)
    // if (!err)
    let {data, err} = yield call(request,
      config.currentServer + `manager/emp/empLoginAjax.do`,
      {
        method: 'POST',
        body: "login=10000g01cadmin&passwd=123456",
      });//ignore token, avoid API 500 error);

    yield put({type: 'CompanyInfo_FETCH_SUCCESSED'})
    // else {
    //
    //   yield put({type: 'CompanyInfo_FETCH_FAILURE', error: err.toString()})
    // }
  }
}


export const sagas = [
  watchFetchCompanyInfo,
  watchLoginRequest
]
