import {
  GET_TRAIT_TYPE_PROFILE,
  GET_TRAIT_TYPE_PROFILE_FAIL,
  GET_TRAIT_TYPE_PROFILE_SUCCESS,
  GET_TRAIT_TYPES,
  GET_TRAIT_TYPES_FAIL,
  GET_TRAIT_TYPES_SUCCESS,
  ADD_NEW_TRAIT_TYPE,
  ADD_TRAIT_TYPE_SUCCESS,
  ADD_TRAIT_TYPE_FAIL,
  UPDATE_TRAIT_TYPE,
  UPDATE_TRAIT_TYPE_SUCCESS,
  UPDATE_TRAIT_TYPE_FAIL,
  DELETE_TRAIT_TYPE,
  DELETE_TRAIT_TYPE_SUCCESS,
  DELETE_TRAIT_TYPE_FAIL,
} from "./actionTypes"

export const getTrait_types = (query) => ({
  type: GET_TRAIT_TYPES,
  query: query
})

export const getTrait_typesSuccess = trait_types => ({
  type: GET_TRAIT_TYPES_SUCCESS,
  payload: trait_types,
})

export const addNewTrait_type = trait_type => ({
  type: ADD_NEW_TRAIT_TYPE,
  payload: trait_type,
})

export const addTrait_typeSuccess = trait_type => ({
  type: ADD_TRAIT_TYPE_SUCCESS,
  payload: trait_type,
})

export const addTrait_typeFail = error => ({
  type: ADD_TRAIT_TYPE_FAIL,
  payload: error,
})

export const getTrait_typesFail = error => ({
  type: GET_TRAIT_TYPES_FAIL,
  payload: error,
})

export const getTrait_typeProfile = () => ({
  type: GET_TRAIT_TYPE_PROFILE,
})

export const getTrait_typeProfileSuccess = trait_typeProfile => ({
  type: GET_TRAIT_TYPE_PROFILE_SUCCESS,
  payload: trait_typeProfile,
})

export const getTrait_typeProfileFail = error => ({
  type: GET_TRAIT_TYPE_PROFILE_FAIL,
  payload: error,
})

export const updateTrait_type = trait_type => ({
  type: UPDATE_TRAIT_TYPE,
  payload: trait_type,
})

export const updateTrait_typeSuccess = trait_type => ({
  type: UPDATE_TRAIT_TYPE_SUCCESS,
  payload: trait_type,
})

export const updateTrait_typeFail = error => ({
  type: UPDATE_TRAIT_TYPE_FAIL,
  payload: error,
})

export const deleteTrait_type = trait_type => ({
  type: DELETE_TRAIT_TYPE,
  payload: trait_type,
})

export const deleteTrait_typeSuccess = trait_type => ({
  type: DELETE_TRAIT_TYPE_SUCCESS,
  payload: trait_type,
})

export const deleteTrait_typeFail = error => ({
  type: DELETE_TRAIT_TYPE_FAIL,
  payload: error,
})
