import { call, put, takeEvery } from "redux-saga/effects"

import { GET_ATTRIBUTES, GET_ATTRIBUTE_PROFILE , ADD_NEW_ATTRIBUTE , DELETE_ATTRIBUTE, UPDATE_ATTRIBUTE } from "./actionTypes"

import {
    getAttributesSuccess,
    getAttributesFail,
    getAttributeProfileSuccess,
    getAttributeProfileFail,
    addAttributeFail,
    addAttributeSuccess,
    updateAttributeSuccess,
    updateAttributeFail,
    deleteAttributeSuccess,
    deleteAttributeFail,
} from "./actions"

import { attributeService } from "services"

function* fetchAttributes(props) {
    try {
        const response = yield call(attributeService.list, props.query)
        yield put(getAttributesSuccess(response))
    } catch (error) {
        yield put(getAttributesFail(error))
    }
}

function* fetchAttributeProfile() {
    try {
        const response = yield call(attributeService.find)
        yield put(getAttributeProfileSuccess(response))
    } catch (error) {
        yield put(getAttributeProfileFail(error))
    }
}

function* onUpdateAttribute({ payload: attribute }) {
    try {
        yield call(attributeService.update, {
            _id:attribute._id,
            params:{
                ...attribute, 
                _id:attribute._id, 
                value: attribute.value,
                description: attribute.description,
                chance: attribute.chance,
                image: attribute.image,
                trait_type: attribute.trait_type,
                forbidden_attributes: attribute.forbidden_attributes,
                forbidden_trait_types: attribute.forbidden_trait_types
            }
        })
        yield put(updateAttributeSuccess(attribute))
    } catch (error) {
        yield put(updateAttributeFail(error))
    }
}

function* onDeleteAttribute({ payload: attribute }) {
    try {
        const response = yield call(attributeService.delete, attribute._id)
        yield put(deleteAttributeSuccess(response))
    } catch (error) {
        yield put(deleteAttributeFail(error))
    }
}

function* onAddNewAttribute({ payload: attribute }) {
    try {
        const response = yield call(attributeService.create, {
          ...attribute, 
          value: attribute.value,
          description: attribute.description,
          chance: attribute.chance,
        //   image: attribute.image,
          trait_type: attribute.trait_type,
          forbidden_attributes: attribute.forbidden_attributes,
          forbidden_trait_types: attribute.forbidden_trait_types
        })
        yield put(addAttributeSuccess(Object.assign({}, attribute, response)))
        yield put(addAttributeFail(null))
    } catch (error) {
        yield put(addAttributeFail(error))
    }
}

function* contactsSaga() {
    yield takeEvery(GET_ATTRIBUTES, fetchAttributes)
    yield takeEvery(GET_ATTRIBUTE_PROFILE, fetchAttributeProfile)
    yield takeEvery(ADD_NEW_ATTRIBUTE, onAddNewAttribute)
    yield takeEvery(UPDATE_ATTRIBUTE, onUpdateAttribute)
    yield takeEvery(DELETE_ATTRIBUTE, onDeleteAttribute)
}

export default contactsSaga;
