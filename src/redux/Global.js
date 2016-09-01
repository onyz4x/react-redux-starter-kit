import { take, put, select, call } from 'redux-saga/effects'
import i18n from 'i18next';
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
export const actions = { changeLanguage }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
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
        i18n.changeLanguage(payload, (err, t) => { });
    }
}

export const sagas = [
    changeLanguageAsync
]