import { call, put, takeEvery } from "redux-saga/effects"

import { GET_TRAIT_TYPES, GET_TRAIT_TYPE_PROFILE , ADD_NEW_TRAIT_TYPE , DELETE_TRAIT_TYPE, UPDATE_TRAIT_TYPE } from "./actionTypes"

import {
    getTrait_typesSuccess,
    getTrait_typesFail,
    getTrait_typeProfileSuccess,
    getTrait_typeProfileFail,
    addTrait_typeFail,
    addTrait_typeSuccess,
    updateTrait_typeSuccess,
    updateTrait_typeFail,
    deleteTrait_typeSuccess,
    deleteTrait_typeFail,
} from "./actions"

import { trait_typeService } from "services"

function* fetchTrait_types({payload: query}) {
    try {
        const response = yield call(trait_typeService.list, query)
        yield put(getTrait_typesSuccess(response))
    } catch (error) {
        yield put(getTrait_typesFail(error))
    }
}

function* fetchTrait_typeProfile() {
    try {
        const response = yield call(trait_typeService.find)
        yield put(getTrait_typeProfileSuccess(response))
    } catch (error) {
        yield put(getTrait_typeProfileFail(error))
    }
}

function* onUpdateTrait_type({ payload: trait_type }) {
    try {
        yield call(trait_typeService.update, {
            _id:trait_type._id,
            params:{
                ...trait_type, 
                _id:trait_type._id, 
                name: trait_type.name, 
                description: trait_type.description,
                hasColor: trait_type.hasColor,
                index: trait_type.index
            }
        })
        yield put(updateTrait_typeSuccess(trait_type))
    } catch (error) {
        yield put(updateTrait_typeFail(error))
    }
}

function* onDeleteTrait_type({ payload: trait_type }) {
    try {
        const response = yield call(trait_typeService.delete, trait_type._id)
        yield put(deleteTrait_typeSuccess(response))
    } catch (error) {
        yield put(deleteTrait_typeFail(error))
    }
}

function* onAddNewTrait_type({ payload: trait_type }) {
    try {
        const response = yield call(trait_typeService.create, {
          ...trait_type, 
          name: trait_type.name,
          description: trait_type.description,
          hasColor: trait_type.hasColor,
          index: trait_type.index
        })
        yield put(addTrait_typeSuccess(Object.assign({}, trait_type, response)))
        yield put(addTrait_typeFail(null))
    } catch (error) {
        yield put(addTrait_typeFail(error))
    }
}

function* contactsSaga() {
    yield takeEvery(GET_TRAIT_TYPES, fetchTrait_types)
    yield takeEvery(GET_TRAIT_TYPE_PROFILE, fetchTrait_typeProfile)
    yield takeEvery(ADD_NEW_TRAIT_TYPE, onAddNewTrait_type)
    yield takeEvery(UPDATE_TRAIT_TYPE, onUpdateTrait_type)
    yield takeEvery(DELETE_TRAIT_TYPE, onDeleteTrait_type)
}

export default contactsSaga;
