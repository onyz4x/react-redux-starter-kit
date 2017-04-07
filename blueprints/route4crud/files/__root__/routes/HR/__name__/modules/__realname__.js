import {take, put, select, call} from 'redux-saga/effects'
import Immutable from 'immutable'
import request from 'utils/request'
import {startSubmit, stopSubmit, destroy} from 'redux-form'
import {message, notification} from 'fe-common';
import config from 'utils/config'

// ------------------------------------
// Constants
// ------------------------------------
export const <%= pascalEntityName %>_FETCH_REQUESTED = '<%= pascalEntityName %>_FETCH_REQUESTED'
export const <%= pascalEntityName %>_FETCH_SUCCESSED = '<%= pascalEntityName %>_FETCH_SUCCESSED'
export const <%= pascalEntityName %>_FETCH_FAILURE = '<%= pascalEntityName %>_FETCH_FAILURE'

export const <%= pascalEntityName %>_SAVE_REQUESTED = '<%= pascalEntityName %>_SAVE_REQUESTED'
export const <%= pascalEntityName %>_SAVE_SUCCESSED = '<%= pascalEntityName %>_SAVE_SUCCESSED'
export const <%= pascalEntityName %>_SAVE_FAILURE = '<%= pascalEntityName %>_SAVE_FAILURE'

export const <%= pascalEntityName %>_DELETE_REQUESTED = '<%= pascalEntityName %>_DELETE_REQUESTED'
export const <%= pascalEntityName %>_DELETE_SUCCESSED = '<%= pascalEntityName %>_DELETE_SUCCESSED'


export const <%= pascalEntityName %>_INSERT_FETCH_REQUESTED = '<%= pascalEntityName %>_INSERT_FETCH_REQUESTED'
export const <%= pascalEntityName %>_DETAIL_FETCH_REQUESTED = '<%= pascalEntityName %>_DETAIL_FETCH_REQUESTED'
export const <%= pascalEntityName %>_DETAIL_FETCH_SUCCESSED = '<%= pascalEntityName %>_DETAIL_FETCH_SUCCESSED'
export const <%= pascalEntityName %>_DETAIL_FETCH_FAILURE = '<%= pascalEntityName %>_DETAIL_FETCH_FAILURE'

export const CLOSE_<%= pascalEntityName %>_INSERTFORM = 'CLOSE_<%= pascalEntityName %>_INSERTFORM'

export const <%= pascalEntityName %>_DESTROY = '<%= pascalEntityName %>_DESTROY'


// ------------------------------------
// Actions
// ------------------------------------
export function fetch<%= pascalEntityName %>() {
  return {
  type: <%= pascalEntityName %>_FETCH_REQUESTED
}
}

export function fetch<%= pascalEntityName %>Detail() {
  return {
  type: <%= pascalEntityName %>_DETAIL_FETCH_REQUESTED
}
}

export function save<%= pascalEntityName %>(values) {
  return {
  type: <%= pascalEntityName %>_SAVE_REQUESTED,
  values: values
}
}

export function delete<%= pascalEntityName %>(id) {
  return {
  type: <%= pascalEntityName %>_DELETE_REQUESTED,
  id
}
}


//0 insert; 1:edit
export function showInsertForm() {
  return {
  type: <%= pascalEntityName %>_INSERT_FETCH_REQUESTED,
}
}

export function showEditForm(id) {
  return {
  type: <%= pascalEntityName %>_DETAIL_FETCH_REQUESTED,
  id
}
}

export function destroy<%= pascalEntityName %>(mode, record) {
  return {
  type: <%= pascalEntityName %>_DESTROY,
}
}

export function closeInsertForm(mode, record) {
  return {
  type: CLOSE_<%= pascalEntityName %>_INSERTFORM,
}
}


export const actions = {
  fetch<%= pascalEntityName %>,
  showInsertForm,
  closeInsertForm,
  save<%= pascalEntityName %>,
  delete<%= pascalEntityName %>,
  fetch<%= pascalEntityName %>Detail,
  showEditForm,
  destroy<%= pascalEntityName %>
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [<%= pascalEntityName %>_FETCH_REQUESTED]: (state) => state.setIn(['isFetching'], true),
  [<%= pascalEntityName %>_FETCH_SUCCESSED]: (state, payload) => state.setIn(['isFetching'], false).setIn(['list'], Immutable.fromJS(payload.data)),
  [<%= pascalEntityName %>_FETCH_FAILURE]: (state, action) => state.setIn(['isFetching'], false),


  [<%= pascalEntityName %>_INSERT_FETCH_REQUESTED]: (state, payload) =>state.setIn(['show<%= pascalEntityName %>Form'], true).setIn(['isEdit'], false),

  [<%= pascalEntityName %>_DETAIL_FETCH_REQUESTED]: (state, payload) =>state.setIn(['show<%= pascalEntityName %>Form'], true).setIn(['isDetailFetching'], true)
  .setIn(['isEdit'], true),
  [<%= pascalEntityName %>_DETAIL_FETCH_SUCCESSED]: (state, payload)=> state.setIn(['isDetailFetching'], false).setIn(['initValues'], payload.data),
  [<%= pascalEntityName %>_DETAIL_FETCH_FAILURE]: (state, payload)=> state.setIn(['isDetailFetching'], false),
  [CLOSE_<%= pascalEntityName %>_INSERTFORM]: (state) =>state.setIn(['show<%= pascalEntityName %>Form'], false).setIn(['initValues'], null),
  [<%= pascalEntityName %>_SAVE_SUCCESSED]: (state, payload) => state.setIn(['show<%= pascalEntityName %>Form'], false).setIn(['initValues'], null),
  [<%= pascalEntityName %>_DESTROY]: (state)=>initialState,
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({
  isFetching: false,
  isDetailFetching: false,
  show<%= pascalEntityName %>Form: false,
  initValues: null,
  isSubmitting: false,
  list: Immutable.List(),
  isEdit: false
})

export default function <%= camelEntityName %>Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}


// ------------------------------------
// Sagas
// ------------------------------------

export function *watchFetchPostion() {
  while (true) {
  yield take(<%= pascalEntityName %>_FETCH_REQUESTED);
  let {data, err} = yield call(request,
  config.currentServer + `hr/<%= pascalEntityName %>s`)
  if (!err) {
  yield put({type: '<%= pascalEntityName %>_FETCH_SUCCESSED', data: data.data})
}
  else {
  if (err.response) {
  let errBody = yield err.response.json();
  notification.error({
  message: 'Error',
  description: errBody.msg,
});
}
  else {
  notification.error({
  message: 'Error',
  description: err.message,
});
}
  yield put({type: <%= pascalEntityName %>_FETCH_FAILURE, error: err.toString()});


}
}


}


export function *watchFetchPostionDetail() {
  while (true) {

  const {id} =yield take(<%= pascalEntityName %>_DETAIL_FETCH_REQUESTED)

  let {data, err} = yield call(request,
  config.currentServer + `hr/<%= pascalEntityName %>/${id}`)
  if (!err) {
  yield put({type: <%= pascalEntityName %>_DETAIL_FETCH_SUCCESSED, data: data.data})
}
  else {

  if (err.response) {
  let errBody = yield err.response.json();
  notification.error({
  message: 'Error',
  description: errBody.msg,
});
}
  else {
  notification.error({
  message: 'Error',
  description: err.message,
});
}
  yield put({type: <%= pascalEntityName %>_DETAIL_FETCH_FAILURE, error: err.toString()});


}


}
}


export function *watchSavePostion() {
  while (true) {

  const {values}=   yield take(<%= pascalEntityName %>_SAVE_REQUESTED);
  yield put(startSubmit('<%= pascalEntityName %>InsertForm'));


  const state = yield select();
  const isEdit = state.<%= pascalEntityName %>.get('isEdit');
  let {data, err} = yield call(request,
  config.currentServer + (isEdit ? `hr/<%= pascalEntityName %>/${values.id}` : `hr/<%= pascalEntityName %>`),
{
  method: isEdit ? "PUT" : "POST",
  body: JSON.stringify(values)
})
  yield put(stopSubmit('<%= pascalEntityName %>InsertForm'));
  if (!err) {
  if (isEdit)
  message.success('Update <%= pascalEntityName %> successful.');
  else
  message.success('Create <%= pascalEntityName %> successful.');
  yield put({type: <%= pascalEntityName %>_SAVE_SUCCESSED})
  yield put(destroy('<%= pascalEntityName %>InsertForm'));
  yield put(fetch<%= pascalEntityName %>())


}
  else {


  if (err.response) {
  let errBody = yield err.response.json();
  notification.error({
  message: 'Error',
  description: errBody.msg,
});
}
  else {
  notification.error({
  message: 'Error',
  description: err.message,
});
}
  yield put({type: '<%= pascalEntityName %>_FETCH_FAILURE'})
}


  //message.success('Update <%= pascalEntityName %> successful');

  // else {
  //
  //   yield put({type: '<%= pascalEntityName %>_FETCH_FAILURE', error: err.toString()})
  // }
}
}

export function *watchDeletePostion() {
  while (true) {
  const {id}= yield take(<%= pascalEntityName %>_DELETE_REQUESTED);

  let {data, err} = yield call(request,
  config.currentServer + `hr/<%= pascalEntityName %>/${id}`
  , {
  method: "DELETE"
})
  if (!err) {
  message.success('Delete <%= pascalEntityName %> successful');
  yield put(fetch<%= pascalEntityName %>());
}
  else {
  if (err.response) {
  let errBody = yield err.response.json();
  notification.error({
  message: 'Error',
  description: errBody.msg,
});
}
  else {
  notification.error({
  message: 'Error',
  description: err.message,
});
}


}
}
}

export const sagas = [
watchFetchPostion,
watchSavePostion,
watchDeletePostion,
watchFetchPostionDetail
]
