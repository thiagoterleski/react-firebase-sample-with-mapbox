// eslint-disable-next-line no-unused-vars

const TYPES = [
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'CANCEL',
  'RESET',
]

const makeActionTypes = (base) => {
  const ref = {}

  TYPES.forEach((type) => {
    ref[type] = `${base}_${type}`
  })

  return ref
}

export const MAP_SET_CURRENT_MARKER_POSITION = makeActionTypes('MAP_SET_CURRENT_MARKER_POSITION')
export const MAP_CHANGE_CREATION_MODE = makeActionTypes('MAP_CHANGE_CREATION_MODE')
export const MAP_SELECT_MARKER = makeActionTypes('MAP_SELECT_MARKER')
