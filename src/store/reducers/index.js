import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import MapReducer from './MapReducer'

const rootReducer = combineReducers({
  firebase,
  map: MapReducer,
})

export default rootReducer
