import { call, put, takeEvery } from "redux-saga/effects"

import { GET_COLORS, GET_COLOR_PROFILE , ADD_NEW_COLOR , DELETE_COLOR, UPDATE_COLOR } from "./actionTypes"

import {
    getColorsSuccess,
    getColorsFail,
    getColorProfileSuccess,
    getColorProfileFail,
    addColorFail,
    addColorSuccess,
    updateColorSuccess,
    updateColorFail,
    deleteColorSuccess,
    deleteColorFail,
} from "./actions"

import { colorService } from "services"

function* fetchColors({payload: query}) {
    try {
        const response = yield call(colorService.list, query)
        yield put(getColorsSuccess(response))
    } catch (error) {
        yield put(getColorsFail(error))
    }
}

function* fetchColorProfile() {
    try {
        const response = yield call(colorService.find)
        yield put(getColorProfileSuccess(response))
    } catch (error) {
        yield put(getColorProfileFail(error))
    }
}

function* onUpdateColor({ payload: color }) {
    try {
        console.log(color);
        yield call(colorService.update, {
            _id:color._id,
            params:{
                ...color, 
                _id:color._id, 
                value: color.value, 
                description: color.description,
                chance: color.chance
            }
        })
        yield put(updateColorSuccess(color))
    } catch (error) {
        yield put(updateColorFail(error))
    }
}

function* onDeleteColor({ payload: color }) {
    try {
        const response = yield call(colorService.delete, color._id)
        yield put(deleteColorSuccess(response))
    } catch (error) {
        yield put(deleteColorFail(error))
    }
}

function* onAddNewColor({ payload: color }) {
    try {
        console.log(color);
        const response = yield call(colorService.create, {
          ...color, 
          value: color.value,
          description: color.description,
          chance: color.chance
        })
        yield put(addColorSuccess(Object.assign({}, color, response)))
        yield put(addColorFail(null))
    } catch (error) {
        yield put(addColorFail(error))
    }
}

function* contactsSaga() {
    yield takeEvery(GET_COLORS, fetchColors)
    yield takeEvery(GET_COLOR_PROFILE, fetchColorProfile)
    yield takeEvery(ADD_NEW_COLOR, onAddNewColor)
    yield takeEvery(UPDATE_COLOR, onUpdateColor)
    yield takeEvery(DELETE_COLOR, onDeleteColor)
}

export default contactsSaga;
