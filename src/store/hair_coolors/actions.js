import {
  GET_HAIR_COOLOR_PROFILE,
  GET_HAIR_COOLOR_PROFILE_FAIL,
  GET_HAIR_COOLOR_PROFILE_SUCCESS,
  GET_HAIR_COOLORS,
  GET_HAIR_COOLORS_FAIL,
  GET_HAIR_COOLORS_SUCCESS,
  ADD_NEW_HAIR_COOLOR,
  ADD_HAIR_COOLOR_SUCCESS,
  ADD_HAIR_COOLOR_FAIL,
  UPDATE_HAIR_COOLOR,
  UPDATE_HAIR_COOLOR_SUCCESS,
  UPDATE_HAIR_COOLOR_FAIL,
  DELETE_HAIR_COOLOR,
  DELETE_HAIR_COOLOR_SUCCESS,
  DELETE_HAIR_COOLOR_FAIL,
} from "./actionTypes"

export const getHair_coolors = (query) => ({
  type: GET_HAIR_COOLORS,
  query: query
})

export const getHair_coolorsSuccess = hair_coolors => ({
  type: GET_HAIR_COOLORS_SUCCESS,
  payload: hair_coolors,
})

export const addNewHair_coolor = hair_coolor => ({
  type: ADD_NEW_HAIR_COOLOR,
  payload: hair_coolor,
})

export const addHair_coolorSuccess = hair_coolor => ({
  type: ADD_HAIR_COOLOR_SUCCESS,
  payload: hair_coolor,
})

export const addHair_coolorFail = error => ({
  type: ADD_HAIR_COOLOR_FAIL,
  payload: error,
})

export const getHair_coolorsFail = error => ({
  type: GET_HAIR_COOLORS_FAIL,
  payload: error,
})

export const getHair_coolorProfile = () => ({
  type: GET_HAIR_COOLOR_PROFILE,
})

export const getHair_coolorProfileSuccess = hair_coolorProfile => ({
  type: GET_HAIR_COOLOR_PROFILE_SUCCESS,
  payload: hair_coolorProfile,
})

export const getHair_coolorProfileFail = error => ({
  type: GET_HAIR_COOLOR_PROFILE_FAIL,
  payload: error,
})

export const updateHair_coolor = hair_coolor => ({
  type: UPDATE_HAIR_COOLOR,
  payload: hair_coolor,
})

export const updateHair_coolorSuccess = hair_coolor => ({
  type: UPDATE_HAIR_COOLOR_SUCCESS,
  payload: hair_coolor,
})

export const updateHair_coolorFail = error => ({
  type: UPDATE_HAIR_COOLOR_FAIL,
  payload: error,
})

export const deleteHair_coolor = hair_coolor => ({
  type: DELETE_HAIR_COOLOR,
  payload: hair_coolor,
})

export const deleteHair_coolorSuccess = hair_coolor => ({
  type: DELETE_HAIR_COOLOR_SUCCESS,
  payload: hair_coolor,
})

export const deleteHair_coolorFail = error => ({
  type: DELETE_HAIR_COOLOR_FAIL,
  payload: error,
})
