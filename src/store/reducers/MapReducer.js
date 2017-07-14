import {
  MAP_SET_CURRENT_MARKER_POSITION,
  MAP_CHANGE_CREATION_MODE,
} from '../types'

const INITIAL_STATE = {
  isCreating: false,
  currentMarkerPostiion: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAP_SET_CURRENT_MARKER_POSITION.REQUEST:
      return {
        ...state,
        currentMarkerPostiion: action.payload,
      }
    case MAP_CHANGE_CREATION_MODE.REQUEST:
      return {
        ...state,
        isCreating: action.payload,
      }
    case '@@reactReduxFirebase/SET':
      return {
        ...state,
        isCreating: false,
      }
    default:
      return state
  }
}
