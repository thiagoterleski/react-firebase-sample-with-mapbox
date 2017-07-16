import {
  MAP_SET_CURRENT_MARKER_POSITION,
  MAP_CHANGE_CREATION_MODE,
  MAP_SELECT_MARKER,
} from '../types'

const INITIAL_STATE = {
  isCreating: false,
  center: [ -49.265382, -25.424429 ],
  selectedMarkerKey: null,
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
    case MAP_SELECT_MARKER.REQUEST:
      return {
        ...state,
        selectedMarkerKey: action.payload,
        center: action.payload.position,
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
