import {
  GET_TRAIT_TYPES_SUCCESS,
  GET_TRAIT_TYPES_FAIL,
  ADD_TRAIT_TYPE_SUCCESS,
  ADD_TRAIT_TYPE_FAIL,
  UPDATE_TRAIT_TYPE_SUCCESS,
  UPDATE_TRAIT_TYPE_FAIL,
  DELETE_TRAIT_TYPE_SUCCESS,
  DELETE_TRAIT_TYPE_FAIL,
  GET_TRAIT_TYPE_PROFILE_SUCCESS,
  GET_TRAIT_TYPE_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  trait_types: [],
  totalSize: 0,
  from: 0,
  trait_typeProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRAIT_TYPES_SUCCESS:
      return {
        ...state,
        trait_types: action.payload.totalData,
        totalSize: action.payload.totalCount[0].count,
        from: action.payload.from,
      }

    case GET_TRAIT_TYPES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_TRAIT_TYPE_SUCCESS:
      return {
        ...state,
        trait_types: [...state.trait_types, action.payload],
        totalSize: state.totalSize+1
      }

    case ADD_TRAIT_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TRAIT_TYPE_PROFILE_SUCCESS:
   
      return {
        ...state,
        trait_type: action.payload,
      }

      case UPDATE_TRAIT_TYPE_SUCCESS:

        
        return {
          ...state,
          trait_types: state.trait_types.map(trait_type =>
            trait_type._id.toString() === action.payload._id.toString()
              ? { trait_type, ...action.payload }
              : trait_type
          ),
        }
  
      case UPDATE_TRAIT_TYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_TRAIT_TYPE_SUCCESS:
        
        return {
          ...state,
          trait_types: state.trait_types.filter(
            trait_type => trait_type._id.toString() !== action.payload._id.toString()
          ),
          totalSize: state.totalSize-1
        }
  
      case DELETE_TRAIT_TYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_TRAIT_TYPE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
