import {
  GET_COLOR_PROFILE,
  GET_COLOR_PROFILE_FAIL,
  GET_COLOR_PROFILE_SUCCESS,
  GET_COLORS,
  GET_COLORS_FAIL,
  GET_COLORS_SUCCESS,
  ADD_NEW_COLOR,
  ADD_COLOR_SUCCESS,
  ADD_COLOR_FAIL,
  UPDATE_COLOR,
  UPDATE_COLOR_SUCCESS,
  UPDATE_COLOR_FAIL,
  DELETE_COLOR,
  DELETE_COLOR_SUCCESS,
  DELETE_COLOR_FAIL,
} from "./actionTypes"

export const getColors = (query) => ({
  type: GET_COLORS,
  query: query
})

export const getColorsSuccess = colors => ({
  type: GET_COLORS_SUCCESS,
  payload: colors,
})

export const addNewColor = color => ({
  type: ADD_NEW_COLOR,
  payload: color,
})

export const addColorSuccess = color => ({
  type: ADD_COLOR_SUCCESS,
  payload: color,
})

export const addColorFail = error => ({
  type: ADD_COLOR_FAIL,
  payload: error,
})

export const getColorsFail = error => ({
  type: GET_COLORS_FAIL,
  payload: error,
})

export const getColorProfile = () => ({
  type: GET_COLOR_PROFILE,
})

export const getColorProfileSuccess = colorProfile => ({
  type: GET_COLOR_PROFILE_SUCCESS,
  payload: colorProfile,
})

export const getColorProfileFail = error => ({
  type: GET_COLOR_PROFILE_FAIL,
  payload: error,
})

export const updateColor = color => ({
  type: UPDATE_COLOR,
  payload: color,
})

export const updateColorSuccess = color => ({
  type: UPDATE_COLOR_SUCCESS,
  payload: color,
})

export const updateColorFail = error => ({
  type: UPDATE_COLOR_FAIL,
  payload: error,
})

export const deleteColor = color => ({
  type: DELETE_COLOR,
  payload: color,
})

export const deleteColorSuccess = color => ({
  type: DELETE_COLOR_SUCCESS,
  payload: color,
})

export const deleteColorFail = error => ({
  type: DELETE_COLOR_FAIL,
  payload: error,
})
