import {
  MAP_SET_CURRENT_MARKER_POSITION,
  MAP_CHANGE_CREATION_MODE,
  MAP_SELECT_MARKER,
} from '../types'

export const setCurrentMarkerPositionAction = (lngLat) => ({
  type: MAP_SET_CURRENT_MARKER_POSITION.REQUEST,
  payload: lngLat,
})

export const toggleCreationModeAction = (active) => ({
  type: MAP_CHANGE_CREATION_MODE.REQUEST,
  payload: active,
})

export const selectedMarkerAction = (marker) => ({
  type: MAP_SELECT_MARKER.REQUEST,
  payload: marker,
})
