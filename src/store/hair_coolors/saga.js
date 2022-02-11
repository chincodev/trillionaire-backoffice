import { call, put, takeEvery } from "redux-saga/effects"

import { GET_HAIR_COOLORS, GET_HAIR_COOLOR_PROFILE , ADD_NEW_HAIR_COOLOR , DELETE_HAIR_COOLOR, UPDATE_HAIR_COOLOR } from "./actionTypes"

import {
    getHair_coolorsSuccess,
    getHair_coolorsFail,
    getHair_coolorProfileSuccess,
    getHair_coolorProfileFail,
    addHair_coolorFail,
    addHair_coolorSuccess,
    updateHair_coolorSuccess,
    updateHair_coolorFail,
    deleteHair_coolorSuccess,
    deleteHair_coolorFail,
} from "./actions"

import { hair_coolorService } from "services"

function* fetchHair_coolors({payload: query}) {
    try {
        const response = yield call(hair_coolorService.list, query)
        yield put(getHair_coolorsSuccess(response))
    } catch (error) {
        yield put(getHair_coolorsFail(error))
    }
}

function* fetchHair_coolorProfile() {
    try {
        const response = yield call(hair_coolorService.find)
        yield put(getHair_coolorProfileSuccess(response))
    } catch (error) {
        yield put(getHair_coolorProfileFail(error))
    }
}

function* onUpdateHair_coolor({ payload: hair_coolor }) {
    try {
        console.log(hair_coolor);
        yield call(hair_coolorService.update, {
            _id:hair_coolor._id,
            params:{
                ...hair_coolor, 
                _id:hair_coolor._id, 
                value: hair_coolor.value, 
                description: hair_coolor.description,
                chance: hair_coolor.chance
            }
        })
        yield put(updateHair_coolorSuccess(hair_coolor))
    } catch (error) {
        yield put(updateHair_coolorFail(error))
    }
}

function* onDeleteHair_coolor({ payload: hair_coolor }) {
    try {
        const response = yield call(hair_coolorService.delete, hair_coolor._id)
        yield put(deleteHair_coolorSuccess(response))
    } catch (error) {
        yield put(deleteHair_coolorFail(error))
    }
}

function* onAddNewHair_coolor({ payload: hair_coolor }) {
    try {
        console.log(hair_coolor);
        const response = yield call(hair_coolorService.create, {
          ...hair_coolor, 
          value: hair_coolor.value,
          description: hair_coolor.description,
          chance: hair_coolor.chance
        })
        yield put(addHair_coolorSuccess(Object.assign({}, hair_coolor, response)))
        yield put(addHair_coolorFail(null))
    } catch (error) {
        yield put(addHair_coolorFail(error))
    }
}

function* contactsSaga() {
    yield takeEvery(GET_HAIR_COOLORS, fetchHair_coolors)
    yield takeEvery(GET_HAIR_COOLOR_PROFILE, fetchHair_coolorProfile)
    yield takeEvery(ADD_NEW_HAIR_COOLOR, onAddNewHair_coolor)
    yield takeEvery(UPDATE_HAIR_COOLOR, onUpdateHair_coolor)
    yield takeEvery(DELETE_HAIR_COOLOR, onDeleteHair_coolor)
}

export default contactsSaga;
