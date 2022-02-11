import {
  GET_HAIR_COOLORS_SUCCESS,
  GET_HAIR_COOLORS_FAIL,
  ADD_HAIR_COOLOR_SUCCESS,
  ADD_HAIR_COOLOR_FAIL,
  UPDATE_HAIR_COOLOR_SUCCESS,
  UPDATE_HAIR_COOLOR_FAIL,
  DELETE_HAIR_COOLOR_SUCCESS,
  DELETE_HAIR_COOLOR_FAIL,
  GET_HAIR_COOLOR_PROFILE_SUCCESS,
  GET_HAIR_COOLOR_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  hair_coolors: [],
  totalSize: 0,
  from: 0,
  hair_coolorProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HAIR_COOLORS_SUCCESS:
      return {
        ...state,
        hair_coolors: action.payload.totalData,
        totalSize: action.payload.totalCount[0].count,
        from: action.payload.from,
      }

    case GET_HAIR_COOLORS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_HAIR_COOLOR_SUCCESS:
      return {
        ...state,
        hair_coolors: [...state.hair_coolors, action.payload],
        totalSize: state.totalSize+1
      }

    case ADD_HAIR_COOLOR_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_HAIR_COOLOR_PROFILE_SUCCESS:
   
      return {
        ...state,
        hair_coolor: action.payload,
      }

      case UPDATE_HAIR_COOLOR_SUCCESS:

        
        return {
          ...state,
          hair_coolors: state.hair_coolors.map(hair_coolor =>
            hair_coolor._id.toString() === action.payload._id.toString()
              ? { hair_coolor, ...action.payload }
              : hair_coolor
          ),
        }
  
      case UPDATE_HAIR_COOLOR_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_HAIR_COOLOR_SUCCESS:
        
        return {
          ...state,
          hair_coolors: state.hair_coolors.filter(
            hair_coolor => hair_coolor._id.toString() !== action.payload._id.toString()
          ),
          totalSize: state.totalSize-1
        }
  
      case DELETE_HAIR_COOLOR_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_HAIR_COOLOR_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
