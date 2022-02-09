import {
  GET_ATTRIBUTES_SUCCESS,
  GET_ATTRIBUTES_FAIL,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_FAIL,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_PROFILE_SUCCESS,
  GET_ATTRIBUTE_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  attributes: [],
  totalSize: 0,
  from: 0,
  attributeProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ATTRIBUTES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        attributes: action.payload.data,
        totalSize: action.payload.total,
        from: action.payload.starting_at,
      }

    case GET_ATTRIBUTES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributes: [...state.attributes, action.payload],
        totalSize: state.totalSize+1
      }

    case ADD_ATTRIBUTE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ATTRIBUTE_PROFILE_SUCCESS:
   
      return {
        ...state,
        attribute: action.payload,
      }

      case UPDATE_ATTRIBUTE_SUCCESS:

        
        return {
          ...state,
          attributes: state.attributes.map(attribute =>
            attribute._id.toString() === action.payload._id.toString()
              ? { attribute, ...action.payload }
              : attribute
          ),
        }
  
      case UPDATE_ATTRIBUTE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_ATTRIBUTE_SUCCESS:
        
        return {
          ...state,
          attributes: state.attributes.filter(
            attribute => attribute._id.toString() !== action.payload._id.toString()
          ),
          totalSize: state.totalSize-1
        }
  
      case DELETE_ATTRIBUTE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_ATTRIBUTE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
