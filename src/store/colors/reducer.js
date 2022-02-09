import {
  GET_COLORS_SUCCESS,
  GET_COLORS_FAIL,
  ADD_COLOR_SUCCESS,
  ADD_COLOR_FAIL,
  UPDATE_COLOR_SUCCESS,
  UPDATE_COLOR_FAIL,
  DELETE_COLOR_SUCCESS,
  DELETE_COLOR_FAIL,
  GET_COLOR_PROFILE_SUCCESS,
  GET_COLOR_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  colors: [],
  totalSize: 0,
  from: 0,
  colorProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COLORS_SUCCESS:
      return {
        ...state,
        colors: action.payload.totalData,
        totalSize: action.payload.totalCount[0].count,
        from: action.payload.from,
      }

    case GET_COLORS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_COLOR_SUCCESS:
      return {
        ...state,
        colors: [...state.colors, action.payload],
        totalSize: state.totalSize+1
      }

    case ADD_COLOR_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COLOR_PROFILE_SUCCESS:
   
      return {
        ...state,
        color: action.payload,
      }

      case UPDATE_COLOR_SUCCESS:

        
        return {
          ...state,
          colors: state.colors.map(color =>
            color._id.toString() === action.payload._id.toString()
              ? { color, ...action.payload }
              : color
          ),
        }
  
      case UPDATE_COLOR_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_COLOR_SUCCESS:
        
        return {
          ...state,
          colors: state.colors.filter(
            color => color._id.toString() !== action.payload._id.toString()
          ),
          totalSize: state.totalSize-1
        }
  
      case DELETE_COLOR_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_COLOR_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
