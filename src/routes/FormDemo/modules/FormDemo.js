import { take, put, select, call } from 'redux-saga/effects'
import {  change } from 'redux-form'
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_CITIES = 'LOAD_CITIES'
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS'

export function loadCities() {
  return {
    type: LOAD_CITIES
  }
}


export function loadCitiesSuccess(value) {
  return {
    type: LOAD_CITIES_SUCCESS,
    payload: value
  }
}



// ------------------------------------
// Actions
// ------------------------------------
export const actions = { loadCities }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_CITIES_SUCCESS]: (state, action) => Object.assign({}, state, { cities: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cities: [],
  countries: [{ id: 1, name: 'china' }, { id: 2, name: 'usa' }],

}
export default function formDemoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------

export function* loadCitiesAsync() {
  while (true) {
    yield take(LOAD_CITIES)
    yield call(asyncWait)
    yield put(loadCitiesSuccess([{ id: 1, name: 'wuhan' }, { id: 2, name: 'guangzhou' }]))
    yield put(change('formDemo', 'city', 1))
  }
}

const asyncWait = () => new Promise((resolve) => {
  setTimeout(() => resolve(), 200)
})
export const sagas = [
  loadCitiesAsync
]