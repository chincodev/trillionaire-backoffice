import {
  GET_ATTRIBUTE_PROFILE,
  GET_ATTRIBUTE_PROFILE_FAIL,
  GET_ATTRIBUTE_PROFILE_SUCCESS,
  GET_ATTRIBUTES,
  GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTES_SUCCESS,
  ADD_NEW_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_FAIL,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAIL,
} from "./actionTypes"

export const getAttributes = (query) => ({
  type: GET_ATTRIBUTES,
  query: query
})

export const getAttributesSuccess = attributes => ({
  type: GET_ATTRIBUTES_SUCCESS,
  payload: attributes,
})

export const addNewAttribute = attribute => ({
  type: ADD_NEW_ATTRIBUTE,
  payload: attribute,
})

export const addAttributeSuccess = attribute => ({
  type: ADD_ATTRIBUTE_SUCCESS,
  payload: attribute,
})

export const addAttributeFail = error => ({
  type: ADD_ATTRIBUTE_FAIL,
  payload: error,
})

export const getAttributesFail = error => ({
  type: GET_ATTRIBUTES_FAIL,
  payload: error,
})

export const getAttributeProfile = () => ({
  type: GET_ATTRIBUTE_PROFILE,
})

export const getAttributeProfileSuccess = attributeProfile => ({
  type: GET_ATTRIBUTE_PROFILE_SUCCESS,
  payload: attributeProfile,
})

export const getAttributeProfileFail = error => ({
  type: GET_ATTRIBUTE_PROFILE_FAIL,
  payload: error,
})

export const updateAttribute = attribute => ({
  type: UPDATE_ATTRIBUTE,
  payload: attribute,
})

export const updateAttributeSuccess = attribute => ({
  type: UPDATE_ATTRIBUTE_SUCCESS,
  payload: attribute,
})

export const updateAttributeFail = error => ({
  type: UPDATE_ATTRIBUTE_FAIL,
  payload: error,
})

export const deleteAttribute = attribute => ({
  type: DELETE_ATTRIBUTE,
  payload: attribute,
})

export const deleteAttributeSuccess = attribute => ({
  type: DELETE_ATTRIBUTE_SUCCESS,
  payload: attribute,
})

export const deleteAttributeFail = error => ({
  type: DELETE_ATTRIBUTE_FAIL,
  payload: error,
})
